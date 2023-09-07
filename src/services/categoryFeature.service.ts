import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { FeatureDto } from 'src/data/feature/feature.dto';
import { CategoryService } from './category.service';
import { UniqueFeatureException } from 'src/exceptions/category/uniqueFeature.exception';
@Injectable()
export class CategoryFeatureService {
  constructor(
    private prismaService: PrismaService,
    private categoryService: CategoryService,
  ) {}
  async getCategoryFeatureValues(name: string) {
    const category = await this.categoryService.findByName(name);
    const features = await this.prismaService.articleFeature.findMany({
      where: { article: { categoryId: { equals: category.id } } },
      include: { feature: true },
    });
    const values = new Map<string, { values: Set<string>; id: number }>();
    features.forEach((feature) => {
      const name = feature.feature.name;
      if (values.has(name)) values.get(name).values.add(feature.value);
      else
        values.set(name, {
          values: new Set([feature.value]),
          id: feature.feature.id,
        });
    });
    const featureValues: { name: string; id: number; values: string[] }[] = [];
    for (const [key, value] of values) {
      featureValues.push({ ...value, values: [...value.values], name: key });
    }
    return featureValues;
  }
  async addFeature(feature: FeatureDto) {
    const category = await this.categoryService.findById(feature.categoryId);
    const parentFeatures = await this.getParentFeatures(category.id);
    const existingFeature = parentFeatures.find(
      (categFeature) => categFeature.featureName === feature.name,
    );
    if (existingFeature)
      throw new UniqueFeatureException(existingFeature.categoryName);
    const childFeatures = await this.getChildFeatures(feature.categoryId);
    const existingChildFeature = childFeatures.find(
      ({ featureName }) => featureName === feature.name,
    );
    if (existingChildFeature)
      throw new UniqueFeatureException(existingFeature.categoryName);
    return await this.createNewFeature(feature.categoryId, feature.name);
  }
  async deleteFeature(id: number) {
    await this.categoryService.findById(id);
    return await this.prismaService.feature.deleteMany({
      where: { id },
    });
  }
  async getCategoryFeatures(categoryId: number) {
    const parentFeatures = (await this.getParentFeatures(categoryId)).map(
      ({ featureId }) => featureId,
    );
    const features = new Set(parentFeatures);
    return features;
  }
  async getParentFeatures(categoryId: number) {
    return await this.prismaService.$queryRaw<
      {
        categoryName: string;
        id: number;
        featureId: number;
        featureName: string;
      }[]
    >`WITH recursive category_hierarchy AS (
	SELECT id,name,parentId, 0 AS depth
	FROM category 
	WHERE id = ${categoryId}
	UNION ALL 
	SELECT c.id,
	c.name,
	c.parentId,
	depth+1
	FROM category c, category_hierarchy h
	WHERE h.parentId = c.id
)
SELECT ch.name AS categoryName,ch.id AS id,ch.depth AS depth,feature.name AS featureName,feature.id AS featureId
FROM category_hierarchy ch
LEFT JOIN category c
ON ch.parentId = c.id
LEFT JOIN feature
ON feature.categoryId = ch.id
order BY ch.depth DESC`;
  }
  private async createNewFeature(categoryId: number, name: string) {
    return await this.prismaService.feature.create({
      data: { categoryId, name },
    });
  }
  async getChildFeatures(categoryId: number) {
    return await this.prismaService.$queryRaw<
      {
        featureId: number;
        depth: number;
        featureName: string;
        categoryId: number;
      }[]
    >`WITH recursive category_hierarchy AS (
	SELECT id,name,parentId, 0 AS depth
	FROM category 
	WHERE id = ${categoryId}
	UNION ALL 
	SELECT c.id,
	c.name,
	c.parentId,
	depth+1
	FROM category c, category_hierarchy h
	WHERE c.parentId = h.id 
)
SELECT ch.depth AS depth,feature.name AS featureName,feature.id AS featureId,ch.id AS categoryId
FROM category_hierarchy ch
LEFT JOIN category c
ON ch.parentId = c.id
INNER JOIN feature
ON feature.categoryId = ch.id
order BY ch.depth ASC`;
  }
}

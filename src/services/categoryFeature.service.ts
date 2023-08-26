import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
@Injectable()
export class CategoryFeature {
  constructor(private prismaService: PrismaService) {}
  private async getParentFeatures(categoryId: number, featureName: string) {
    const features = new Set<string>(featureName);
    const subtreeFeatures = await this.prismaService.$queryRaw<
      {
        categoryName: string;
        id: number;
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
SELECT ch.name AS categoryName,ch.id AS id,ch.depth AS depth,feature.name AS featureName
FROM category_hierarchy ch
LEFT JOIN category c
ON ch.parentId = c.id
LEFT JOIN feature
ON feature.categoryId = ch.id
order BY ch.depth DESC`;
    for (const feature of subtreeFeatures) {
      if (features.has(feature.featureName)) return feature.categoryName;
      features.add(feature.featureName);
    }
    return null;
  }
  private async getChildFeatures(categoryId: number, featureName: string) {
    return await this.prismaService.$queryRaw<
      { featureId: number }[]
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
SELECT ch.depth AS depth,feature.name AS featureName,feature.id AS featureId
FROM category_hierarchy ch
LEFT JOIN category c
ON ch.parentId = c.id
INNER JOIN feature
ON feature.categoryId = ch.id
WHERE feature.name = ${featureName}
order BY ch.depth ASC`;
  }
}

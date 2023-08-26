export class UniqueFeatureException extends Error {
  constructor(category: string) {
    super(`The feature already exists in ${category}`);
  }
}

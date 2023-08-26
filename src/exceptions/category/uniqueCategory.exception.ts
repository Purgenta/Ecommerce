export class UniqueCategoryException extends Error {
  constructor() {
    super('Same category already exists');
  }
}

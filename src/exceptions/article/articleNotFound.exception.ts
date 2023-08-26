export class ArticleNotFoundException extends Error {
  constructor() {
    super('Such an article doesnt exist');
  }
}

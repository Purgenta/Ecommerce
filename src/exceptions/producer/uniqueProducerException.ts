export class UniqueProducerException extends Error {
  constructor(name: string) {
    super('The producer under the name of' + name + ' already exists');
  }
}

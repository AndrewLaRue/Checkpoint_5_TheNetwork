export class Ad {
  constructor(data) {
    this.id = data.id || ''
    this.title = data.title || ''
    this.tall = data.tall || ''
    this.square = data.square || ''
    this.banner = data.banner || ''
  }
}
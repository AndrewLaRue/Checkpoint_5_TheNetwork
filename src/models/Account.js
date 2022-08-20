export class Account {
  constructor(data) {
    this.id = data.id || ''
    this.name = data.name || ''
    this.email = data.email || ''
    this.picture = data.picture || ''
    this.coverImg = data.coverImg || ''
    this.github = data.github || ''
    this.linkedin = data.linkedin || ''
    this.class = data.class || ''
    this.graduated = data.graduated || false
    this.resume = data.resume || ''
    this.bio = data.bio || ''
  }
}

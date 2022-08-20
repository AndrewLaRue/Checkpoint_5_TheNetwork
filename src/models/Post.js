export class Post {
  constructor(data) {
    this.id = data.posts.id || ''
    this.imgUrl = data.posts.imgUrl || ''
    this.body = data.posts.body || ''
    this.creatorId = data.posts.creatorId || ''
    this.createdAt = new Date()
    this.likes = data.posts.likes || {}
    this.creator = data.posts.creator || {}
  
}
}
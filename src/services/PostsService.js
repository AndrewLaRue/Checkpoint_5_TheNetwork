import { AppState } from "../AppState.js"
import { Post } from "../models/Post.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"



class PostsService{

  async getPosts() {
    const res = await api.get('api/posts')
    logger.log('get posts res', res.data)
    AppState.posts = res.data.posts
    AppState.newer = res.data.newer
    AppState.older = res.data.older

    // logger.log('newer page', AppState.newer)
    // logger.log('older page', AppState.older)
  }
    async getPostsByCreatorId(creatorId) {
    const res = await api.get('api/posts', {
      params: {
        creatorId
      }
    })
      AppState.profilePosts = res.data.posts
          AppState.newer = res.data.newer
    AppState.older = res.data.older
  }
      async changePage(url) {

        const res = await api.get(url)
        logger.log(res.data)
    AppState.posts = res.data.posts
    AppState.newer = res.data.newer
    AppState.older = res.data.older
    }
      async changeProfilePage(url) {

        const res = await api.get(url)
        logger.log(res.data)
    AppState.profilePosts = res.data.posts
    AppState.newer = res.data.newer
    AppState.older = res.data.older
    }

  async editPost() {
    const res = await api.put(`api/posts/${postData.id}`, postData)
    let index = AppState.projects.findIndex(p => p.id == postData.id)

    AppState.posts.splice(index, 1, new Project(res.data))
  }

  async createPost(postData) {
    const res = await api.post('/api/posts', postData)
    AppState.posts.unshift(new Post(res.data))
  }

  async deletePost(postId) {
    await api.delete(`api/posts/${postId}`) 
    AppState.posts = AppState.posts.filter(p => p.id != postId)
}

}

export const postsService = new PostsService()
import { AppState } from "../AppState.js"
import { Post } from "../models/Post.js"
import { logger } from "../utils/Logger.js"
import Pop from "../utils/Pop.js"
import { api } from "./AxiosService.js"



class PostsService{

  async getPosts() {
    const res = await api.get('api/posts')
    // logger.log('get posts res', res.data)
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

  async getPostsByQuery(query) {
    const res = await api.get('api/posts', {
      params: {
        query
      }
    })
    if (res.data.posts == '') {
      Pop.toast('Your search had zero results')
      return
    } else {
      AppState.posts = res.data.posts
      AppState.newer = res.data.newer
      AppState.older = res.data.older
    }
  }
      async changePage(url) {

        const res = await api.get(url)
        // logger.log(res.data)
    AppState.posts = res.data.posts
    AppState.newer = res.data.newer
        AppState.older = res.data.older
        this.scrollBehavior()
        
  }
       scrollBehavior() {
        window.scrollTo(0,0);
      }
    
      async changeProfilePage(url) {

        const res = await api.get(url)
        logger.log(res.data)
        AppState.profilePosts = res.data.posts
        AppState.newerPro = res.data.newer
        AppState.olderPro = res.data.older
        this.scrollBehavior()
    }

  async createPost(postData) {
    const res = await api.post('/api/posts', postData)
    AppState.posts.unshift(res.data)
    this.getPosts()

  }

  async deletePost(postId) {
    await api.delete(`api/posts/${postId}`) 
    AppState.posts = AppState.posts.filter(p => p.id != postId)
  }
  
  async judgePost(postId) {
    await api.post(`api/posts/${postId}/like`)

      this.getPosts()

      this.getPostsByCreatorId(AppState.activeProfile.id)

  }

}

export const postsService = new PostsService()
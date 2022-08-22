import { AppState } from "../AppState.js"
import { logger } from "../utils/Logger.js"
import Pop from "../utils/Pop.js"
import { api } from "./AxiosService.js"



class PostsService{

  async getPosts() {
    const res = await api.get('api/posts')
    // logger.log('get posts res', res.data)
    AppState.toggle = false
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
      AppState.toggle = true
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
      // router.push({ name: 'Home' })
    }
  }
      async changePage(url) {

        const res = await api.get(url)
        // logger.log(res.data)
        AppState.posts = res.data.posts
        AppState.newer = res.data.newer
        AppState.older = res.data.older
        AppState.activePage = res.data.page
        this.scrollBehavior()
        
  }
       scrollBehavior() {
        window.scrollTo(0,0);
      }
    
      async changeProfilePage(url) {

        const res = await api.get(url)
        logger.log(res.data)
        AppState.profilePosts = res.data.posts
        AppState.newer = res.data.newer
        AppState.older = res.data.older
        this.scrollBehavior()
    }

  async createPost(postData) {
    const res = await api.post('/api/posts', postData)
    AppState.posts.unshift(res.data)

    if (!AppState.toggle) {
      this.getPosts()
    } else {
      this.getPostsByCreatorId(AppState.activeProfile.id)
    }
  }

  async deletePost(postId) {
    await api.delete(`api/posts/${postId}`) 

      AppState.posts = AppState.posts.filter(p => p.id != postId)

      AppState.profilePosts = AppState.profilePosts.filter(p => p.id != postId)

  }
  
  async judgePost(postId) {
    await api.post(`api/posts/${postId}/like`)
    if (!AppState.toggle) {
      this.getPosts()
    } else {
      this.getPostsByCreatorId(AppState.activeProfile.id)
    }



  }

}

export const postsService = new PostsService()
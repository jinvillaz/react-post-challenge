import { Post } from './../model/post'
import axios from 'axios'
import { notificationService } from './notification.service'

const api = process.env.REACT_APP_API_URL + '/posts'

class PostService {
  async getPosts(page?: number): Promise<Post[]> {
    try {
      let url = api
      if (page) {
        url += `?page=${page}`
      }
      const { data } = await axios.get(url)
      return data
    } catch (e) {
      notificationService.handleError(e)
      return []
    }
  }

  async getPost(id: string): Promise<Post | null> {
    try {
      const { data } = await axios.get(`${api}/${id}`)
      return data
    } catch (e) {
      notificationService.handleError(e)
      return null
    }
  }
}

export const postService = new PostService()

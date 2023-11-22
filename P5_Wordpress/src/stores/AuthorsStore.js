import { defineStore } from 'pinia'
import APIService from '../services/APIService'

export const useAuthorsStore = defineStore('authors', {
  state: () => ({
    authors: []
  }),
  getters: {
    getAuthors(state) {
      return state.authors
    }
  },
  actions: {
    async fetchAuthors() {
      try {
        let head = await APIService.head('users?per_page=100')
        if (head.get('X-WP-Total') !== this.authors.count) {
          console.log(head.get('X-WP-Total'), this.authors.count)
          this.authors = []
          for (let index = 1; index <= head.get('X-WP-TotalPages'); index++) {
            let data = await APIService.get('users?per_page=100&page=' + index)
            for (let itm of data) {
              let head = await APIService.head('?author=' + itm.id)
              itm.postCount = head.get('X-WP-Total')
            }
            this.authors = [...this.authors, ...data]
          }
        }
        this.authors.sort((a, b) => {
          return a.name > b.name ? 1 : -1
        })
      } catch (error) {
        console.console.log(error)
      }
    }
  }
})

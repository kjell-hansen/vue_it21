import { defineStore } from 'pinia'
import APIService from '../services/APIService'
/**
 * Store för att lagra all  metadata om författare
 */
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
    /**
     * Hämta författare från API:et
     */
    async fetchAuthors() {
      try {
        // Hämta information om antalet författare
        let head = await APIService.head('users?per_page=100')
        if (head.get('X-WP-Total') !== this.authors.count) {
          // Antalet författare stämmer inte med antalet i arrayen, ladda om!
          this.authors = []
          for (let index = 1; index <= head.get('X-WP-TotalPages'); index++) {
            // Anrop för att hämta antalet inlägg per person
            let data = await APIService.get('users?per_page=100&page=' + index)
            for (let itm of data) {
              let head = await APIService.head('posts?author=' + itm.id)
              itm.count = head.get('X-WP-Total')
            }
            this.authors = [...this.authors, ...data]
          }
        }
        // Sortera i bokstavsordning
        this.authors.sort((a, b) => {
          return a.name > b.name ? 1 : -1
        })
      } catch (error) {
        console.log(error)
      }
    }
  }
})

import { defineStore } from 'pinia'
import APIService from '../services/APIService'
/**
 * Store för att lagra metadata om alla taggar
 */
export const useTagsStore = defineStore('tags', {
  state: () => ({
    tags: []
  }),
  getters: {
    getTags(state) {
      return state.tags
    }
  },
  actions: {
    async fetchTags() {
      try {
        // Hämta information om antalet taggar
        let head = await APIService.head('tags?per_page=100')
        if (head.get('X-WP-Total') !== this.tags.count) {
          // Antalet taggar stämmer inte med antalet i arrayen. Ladda om arrayen
          this.tags = []
          for (let index = 1; index <= head.get('X-WP-TotalPages'); index++) {
            let data = await APIService.get('tags?per_page=100&page=' + index)
            this.tags = [...this.tags, ...data]
          }
        }
        // Sortera i bokstavsordning
        this.tags.sort((a, b) => {
          return a.name > b.name ? 1 : -1
        })
      } catch (error) {
        console.log(error)
      }
    }
  }
})

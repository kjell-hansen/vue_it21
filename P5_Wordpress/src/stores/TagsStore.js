import { defineStore } from 'pinia'
import APIService from '../services/APIService'

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
    async fetchCategories() {
      try {
        let head = await APIService.head('tags?per_page=100')
        if (head.get('X-WP-Total') !== this.tags.count) {
          console.log(head.get('X-WP-Total'), this.tags.count)
          this.tags = []
          for (let index = 1; index <= head.get('X-WP-TotalPages'); index++) {
            let data = await APIService.get('categories?per_page=100&page=' + index)
            this.tags = [...this.tags, ...data]
          }
        }
        this.tags.sort((a, b) => {
          return a.name > b.name ? 1 : -1
        })
      } catch (error) {
        console.console.log(error)
      }
    }
  }
})

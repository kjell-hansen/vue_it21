import { defineStore } from 'pinia'
import APIService from '../services/APIService'

export const useCategoriesStore = defineStore('categories', {
  state: () => ({
    categories: []
  }),
  getters: {
    getCategories(state) {
      return state.categories
    }
  },
  actions: {
    async fetchCategories() {
      try {
        let head = await APIService.head('categories?per_page=100')
        if (head.get('X-WP-Total') !== this.categories.count) {
          console.log(head.get('X-WP-Total'), this.categories.count)
          this.categories = []
          for (let index = 1; index <= head.get('X-WP-TotalPages'); index++) {
            let data = await APIService.get('categories?per_page=100&page=' + index)
            for (let itm of data) {
              let cat = await APIService.get('categories/' + itm.id)
              itm.postCount = cat.count
            }
            this.categories = [...this.categories, ...data]
          }
        }
        this.categories.sort((a, b) => {
          return a.name > b.name ? 1 : -1
        })
      } catch (error) {
        console.log(error)
      }
    }
  }
})

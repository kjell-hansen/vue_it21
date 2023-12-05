import { defineStore } from 'pinia'
import APIService from '../services/APIService'
/**
 * Store för att lagra metadata om alla kategorier
 */
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
        // Hämta information om antalet kategorier
        let head = await APIService.head('categories?per_page=100')
        if (head.get('X-WP-Total') !== this.categories.count) {
          // Antalet kategorier stämmer inte med antalet element i arrayen, ladda om arrayen
          this.categories = []
          for (let index = 1; index <= head.get('X-WP-TotalPages'); index++) {
            let data = await APIService.get('categories?per_page=100&page=' + index)
            this.categories = [...this.categories, ...data]
          }
        }
        // Sortera kategorierna i bokstavsordning
        this.categories.sort((a, b) => {
          return a.name > b.name ? 1 : -1
        })
      } catch (error) {
        console.log(error)
      }
    }
  }
})

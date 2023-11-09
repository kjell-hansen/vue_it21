export default new (class APIService {
  constructor() {
    this.apiBase = 'https://www.datanom.ax/~kjell/ox2/wp-json/wp/v2/'
    this.apiBase = 'https://www.asf.ax/wp-json/wp/v2/'
    //this.apiBase = 'https://www.datanom.ax/~jimmy/wplatest/wp-json/wp/v2/'
  }

  get(params) {
    return new Promise((resolve, reject) => {
      // Hämta data från endpointen
      console.log(this.apiBase + params)
      fetch(this.apiBase + params, {
        method: 'GET'
        //        credentials: 'include'
      })
        .then((response) => {
          if (response.status === 200) {
            resolve(response.json())
          } else {
            throw response.text()
          }
        })
        .catch((err) => {
          // Något gick fel
          reject(err)
        })
    })
  }

  post(params, object = {}) {
    return new Promise((resolve, reject) => {
      let formData = new FormData()
      if (object instanceof FormData) {
        formData = object
      } else {
        // Lägg till alla element från indata-objektet
        for (const property in object) {
          formData.append(property, object[property])
        }
      }
      // Skicka förfrågan till api:et
      fetch(this.apiBase + params, {
        method: 'post',
        body: formData
      })
        .then((response) => {
          if (response.status === 200) {
            return response.json()
          } else {
            throw response.text()
          }
        })
        .catch((err) => {
          // Något gick fel
          reject(err)
        })
    })
  }
})()

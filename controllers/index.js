const axios = require('axios')
const url = 'http://localhost:3000'
const {fetchData, getMarkup, sortedData} = require('../helpers')

class Controller {  
  static async getExpeditions (req, res, next) {
    try {
      const data = await fetchData()
      if (data && data.length) {
        res.status(200).json(data)
      }else {
        throw data
      }
    } catch (err) {
      next(err)
    }
  }

  static async getCost (req, res, next) {
    try {
      const data = await axios({
        url: `${url}/expeditions`,
        method: 'GET'
      })
      if (data) {
        const result = []
        data.data?.forEach(expedition => {
          expedition.services?.forEach(service => {
            service.markup = getMarkup(service.totalPrice)
          })
          result.push(expedition)
        })
        res.status(200).json(result)
      }
    } catch (err) {
      next(err)
    }
  }

  static async getSeveralExpeditions (req, res, next) {
    try {
      const data = await axios({
        url: `${url}/expeditions/costs`,
        method: 'GET'
      })
      if (data) {
        const result = sortedData(data.data, ['grab_express', 'deliveree', 'paxel'])
        res.status(200).json(result)
      }
    } catch (err) {
      next(err)
    }
  }
  
}

module.exports = Controller
import axios from 'axios'
import env from '../config/environtment'

const URL = env.apiHost

class Api {
  get = async (path) => {
    try {
      let response = await axios({
        method: 'GET',
        url: `${URL}${path}`,
        headers: {
          'Content-Type': 'application/json'
        },
      })
      
      return response
    } catch(err) {
      return err.response
    }
  }

  post = async (path, data) => {
    try {
      let response = await axios({
        method: 'POST',
        url: `${URL}${path}`,
        headers: {
          'Content-Type': 'application/json'
        },
        data: data
      })
      return response
    } catch(err) {
      return err.response
    }
  }

  delete = async (path) => {
    try {
      let response = await axios({
        method: 'DELETE',
        url: `${URL}${path}`,
        headers: {
          'Content-Type': 'application/json'
        }
      })
      return response
    } catch(err) {
      return err.response
    }
  }
}

let api = new Api()
export default api
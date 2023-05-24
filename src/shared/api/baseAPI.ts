import axios from 'axios'

import { API_URL } from '../constants/api'

export const BaseAPI = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  },
  timeout: 60 * 1000,
  maxRedirects: 10
})

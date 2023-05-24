import axios from 'axios'

import { FAKE_API_URL } from '../constants/api'

export const BaseFakeAPI = axios.create({
  baseURL: FAKE_API_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  },
  timeout: 60 * 1000,
  maxRedirects: 10
})

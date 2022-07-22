/* eslint-disable */
import { AxiosInstance } from 'axios'
import mockServer from 'axios-mock-server'
import mock0 from './user/list'
import mock1 from './company/listcompany'

export default (client?: AxiosInstance) => mockServer([
  {
    path: '/user/list',
    methods: mock0
  },
  {
    path: '/company/listcompany',
    methods: mock1
  }
], client, '')

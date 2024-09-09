/* eslint-disable no-console */
/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */

import express from 'express'
import cors from 'cors'
import exitHook from 'async-exit-hook'
import { CONNNECT_DB, GET_DB, CLOSE_DB } from '~/config/mongodb'
import { env } from '~/config/environment'
import { APIs_V1 } from '~/routes/v1'
import { errorHandlingMiddleware } from './middlewares/errorHandlingMiddleware'
import { corsOptions } from '~/config/cors'
const START_SERVER = () => {
  const app = express()
  // xử lý CORS
  app.use(cors(corsOptions))
  // enable req.body json data
  app.use(express.json())
  app.use('/v1', APIs_V1)
  //Middlewwảe xử lý lỗi tập trung
  app.use(errorHandlingMiddleware)
  app.listen(env.APP_PORT, env.APP_HOST, () => {
    // eslint-disable-next-line no-console
    console.log(` I am ${env.AUTHOR} running at http://${env.APP_HOST}:${env.APP_PORT}/`)
  })
  exitHook(() => {
    console.log('4...shutdown')
    CLOSE_DB()
    console.log('5...disconect')
  })
}
// IIFE js
(async () => {
  try {
    console.log('1...')
    await CONNNECT_DB()
    console.log('2...')
    // khởi động server BE sau khi connect dtb thành công
    START_SERVER()
  }
  catch (error) {
    console.error(error)
    process.exit(0)
  }
})()

// CONNNECT_DB()
//   .then(() => console.log('Connected to MongoDB Atlas!'))
//   .then(() => START_SERVER())
//   .catch(error => {
//     console.error(error)
//     process.exit(0)
//   })
import express from 'express'
import { StatusCodes } from 'http-status-codes'
import { boardValidation } from '~/validations/boardValidations'
import { boardController } from '~/controllers/boardControllers'
const Router = express.Router()
Router.route('/')
  .get((req, res) => {
    res.status(StatusCodes.OK).json({ message: 'GET: Api get list board' })
  })
  .post(boardValidation.createNew, boardController.createNew)

export const boardRoute = Router

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
Router.route('/:id')
  .get(boardController.getDetails)
  .put()
export const boardRoute = Router

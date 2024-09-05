import { StatusCodes } from 'http-status-codes'
import ApiError from '~/utils/ApiError'
import { boardService } from '~/services/boardService'

const createNew = async (req, res, next) => {
  try {
    // điều hướng dât sang tầng service
    const createdBoard = await boardService.createNew(req.body)
    // Có kết quả khi trả về phía Client
    res.status(StatusCodes.CREATED).json(createdBoard)
  }

  catch (error) {
    next(error)
    // res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    //     errors:error.message
    // })
  }
}
const getDetails = async (req, res, next) => {
  try {
    // điều hướng dât sang tầng service
    const boardId = req.params.id
    // sau nay có cả userId đẻ lấy board user 
    const board = await boardService.getDetails(boardId)
    // Có kết quả khi trả về phía Client
    res.status(StatusCodes.CREATED).json(board)
  }

  catch (error) {
    next(error)
    // res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    //     errors:error.message
    // })
  }
}
export const boardController = {
  createNew,
  getDetails
}
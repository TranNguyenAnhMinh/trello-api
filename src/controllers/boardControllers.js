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
export const boardController = {
  createNew
}
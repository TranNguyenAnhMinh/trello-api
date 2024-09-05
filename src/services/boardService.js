import { slugify } from '~/utils/formatters'
import { boardModel } from '~/models/boardModel'
import ApiError from '~/utils/ApiError'
import { StatusCodes } from 'http-status-codes'
const createNew = async (reqBody) => {
  // eslint-disable-next-line no-useless-catch
  try {
    // xử lý logic đặc thù prj
    const newBoard = {
      ...reqBody,
      slug: slugify(reqBody.title)
    }
    // gọi tới Model để xử lý lưu bản ghi vào trong database
    const createdBoard = await boardModel.createNew(newBoard)
    console.log(createdBoard)
    // lấy bản ghi board sau khi gọi (tùy mục đích dự án có cần bước này hay không)
    const getNewBoard = await boardModel.findOneById(createdBoard.insertedId)

    return getNewBoard
  }
  catch (error) {
    throw error
  }
}
const getDetails = async (boardId) => {
  // eslint-disable-next-line no-useless-catch
  try {
    // xử lý logic đặc thù prj
    const board = await boardModel.getDetails(boardId)
    if (!board) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Board not found')
    }
    // gọi tới Model để xử lý lưu bản ghi vào trong database
    return board
  }
  catch (error) {
    throw error
  }
}


export const boardService = {
  createNew,
  getDetails
}
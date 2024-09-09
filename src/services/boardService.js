import { slugify } from '~/utils/formatters'
import { boardModel } from '~/models/boardModel'
import ApiError from '~/utils/ApiError'
import { StatusCodes } from 'http-status-codes'
import { cloneDeep } from 'lodash'
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
    // deepclone tạo 1 cái mới không dính đến cái cũ không ảnh hưởng đến board ban đầu
    const resBoard = cloneDeep(board)
    // đưa  card về đúng column của nó
    resBoard.columns.forEach(column => {
      // column.cards = resBoard.cards.filter(card => card.columnId.equals(column._id)) equals là method của mongodb
      column.cards = resBoard.cards.filter(card => card.columnId.toString() === column._id.toString())
    })
    // xóa mảng card ra khỏi board ban đầu
    delete resBoard.cards
    // gọi tới Model để xử lý lưu bản ghi vào trong database
    return resBoard
  }
  catch (error) {
    throw error
  }
}


export const boardService = {
  createNew,
  getDetails
}
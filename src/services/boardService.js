import { slugify } from '~/utils/formatters'
import { boardModel } from '~/models/boardModel'
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

export const boardService = {
  createNew
}
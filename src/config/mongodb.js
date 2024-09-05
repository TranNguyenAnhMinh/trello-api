/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */

const MONGODB_URI = 'mongodb+srv://trannguyenanhminh2000dl:eiI9prdQA2DF2PDv@cluster0-anhmin.bums9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0-AnhMin'

const DATABASE_NAME = 'trello-mern-stack'

import { MongoClient, ServerApiVersion } from 'mongodb'
import { env } from '~/config/environment'

let trelloDatabaseInstance = null
// khởi tạo 1 đối tượng instance để connect tới MongoDB
const mongoClientInstance = new MongoClient(env.MONGODB_URI, {
  serverApi:{
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true
  }
})
// kết nối tới dtb
export const CONNNECT_DB = async () => {
  //Gọi kết nối tới mongodb atlas với uri đã khai báo trong thân của mongoClientInstance
  await mongoClientInstance.connect()
  // kết nối thành công thì lấy db theo tên và gắn ngược lại vào biến trelloDatabaseInstance ở trên
  trelloDatabaseInstance = mongoClientInstance.db(env.DATABASE_NAME)
}
export const CLOSE_DB = async () =>{
  await mongoClientInstance.close()
}
// Function Get_DB có nhiệm vụ export ra cái trello dtb instance sau khi connect thành công tới monfgodb để chúng ta sử dụng ở nhiều nơi khác nhau trong code
// lưu ý phải đảm bảo chỉ luôn gọi cái getDB này sau khi đã kết nối thành công tới môngdb
export const GET_DB =() => {
  if (!trelloDatabaseInstance) throw new Error('Must connect to dtb frirst!')
  return trelloDatabaseInstance
}
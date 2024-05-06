import { userEntity } from '../entities/user.entity'
import { LogSuccess, LogError } from '../../utils/logger'

//CRUD
/**
 * Method to obtain all Users from Collection "Users" in Mongo Sever
 */
export const getAllUsers = async (): Promise<any[] | undefined> => {
  try {
    let userModel = userEntity()
    // Search all users
    return await userModel.find({ isDelete: false })
  } catch (error) {
    LogError(`[ORM ERROR]: Getting All Users ${error}`)
  }
}
//-Get User By Id
export const getUserByID = async (id: string): Promise<any | undefined> => {
  try {
    let userModels = userEntity()
    //Search User By ID
    return await userModels.findById(id)
  } catch (error) {
    LogError(`[ORM ERROR]: Getting User By ID ${error}`)
  }
}
//TODO:

//-Get User By Email
//-Delete User By Id
//-Create new User
//-Update User By Id

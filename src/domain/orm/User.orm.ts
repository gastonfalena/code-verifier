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
//-Delete User By Id
export const deleteUserByID = async (id: string): Promise<any | undefined> => {
  try {
    let userModel = userEntity()
    //Delete User BY ID
    return await userModel.deleteOne({ _id: id })
  } catch (error) {
    LogError(`[ORM ERROR]: Deleting User By ID ${error}`)
  }
}
//-Create new User
export const createUser = async (user: any): Promise<any | undefined> => {
  try {
    let userModel = userEntity()
    //Create / Insert new User
    return await userModel.create(user)
  } catch (error) {
    LogError(`[ORM ERROR]: Creating User ${error}`)
  }
}
//-Update User By Id
export const updateUserByID = async (
  user: any,
  id: string
): Promise<any | undefined> => {
  try {
    let userModel = userEntity()
    return await userModel.findByIdAndUpdate(id, user)
  } catch (error) {
    LogError(`[ORM ERROR]: Updating User ${id}: ${error}`)
  }
}

//TODO:

//-Get User By Email

import { userEntity } from '../entities/user.entity'
import { LogSuccess, LogError } from '../../utils/logger'
import { IUser } from '../interfaces/IUser.interface'
import { IAuth } from '../interfaces/IAuth.interface'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
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

//Login User

//Register User
export const registerUser = async (user: IUser): Promise<any | undefined> => {
  try {
    let userModel = userEntity()
    //Create / Insert new User
    return await userModel.create(user)
  } catch (error) {
    LogError(`[ORM ERROR]: Creating User ${error}`)
  }
}
//Login User
export const loginUser = async (auth: IAuth): Promise<any | undefined> => {
  try {
    let userModel = userEntity()
    //Find user by email
    userModel.findOne({ email: auth.email }, (err: any, user: IUser) => {
      if (err) {
        //(500)
      }
      if (!user) {
        //(404)
      }
      //use bcrypt to compare password
      let validPassword = bcrypt.compareSync(auth.password, user.password)
      if (!validPassword) {
        //(401) not authorised
      }
      // Crete jwt
      let token = jwt.sign({ email: user.email }, 'SECRET', {
        expiresIn: '2h',
      })
      return token
    })
  } catch (error) {
    LogError(`[ORM ERROR]: Creating User ${error}`)
  }
}
//Logout User
export const logoutUser = async (): Promise<any | undefined> => {}
//TODO:

//-Get User By Email

import { userEntity } from '../entities/User.entity'
import { LogSuccess, LogError } from '../../utils/logger'
import { IUser } from '../interfaces/IUser.interface'
import { IAuth } from '../interfaces/IAuth.interface'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { UserResponse } from '../types/UsersResponse.types'
import { kataEntity } from '../entities/Kata.entity'
import { IKata } from '../interfaces/IKata.interface'
import mongoose from 'mongoose'

//Enviroment variables
dotenv.config()
const secret = process.env.SECRETKEY || 'mysecret'
//CRUD
/**
 * Method to obtain all Users from Collection "Users" in Mongo Sever
 */
export const getAllUsers = async (
  page: number,
  limit: number
): Promise<UserResponse | undefined> => {
  try {
    let userModel = userEntity()
    let response: UserResponse = {
      users: [],
      totalPages: 0,
      currentPage: page,
    }
    // Search all users
    await userModel
      .find({ isDeleted: false })
      .select('name email age')
      .limit(limit)
      .skip((page - 1) * limit)
      .exec()
      .then((users: IUser[]) => {
        users.forEach((user: IUser) => {
          user.password = ''
        })
        response.users = users
      })
    // Count total documents in collections "Users"
    await userModel.countDocuments().then((total: number) => {
      response.totalPages = Math.ceil(total / limit) //total number pages
      response.currentPage = page
    })

    return response
  } catch (error) {
    LogError(`[ORM ERROR]: Getting All Users ${error}`)
  }
}
//-Get User By Id
export const getUserByID = async (id: string): Promise<any | undefined> => {
  try {
    let userModels = userEntity()
    //Search User By ID
    return await userModels.findById(id).select('name email age katas')
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
// export const createUser = async (user: any): Promise<any | undefined> => {
//   try {
//     let userModel = userEntity()
//     //Create / Insert new User
//     return await userModel.create(user)
//   } catch (error) {
//     LogError(`[ORM ERROR]: Creating User ${error}`)
//   }
// }
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

    let userFound: IUser | undefined = undefined
    let token = undefined
    //Find user by email
    await userModel
      .findOne({ email: auth.email })
      .then((user: IUser) => {
        userFound = user
      })
      .catch((error) => {
        console.error(`[ERROR Authentication in ORM]: User Not Found`)
        throw new Error(
          `[ERROR Authentication in ORM]: User Not Found: ${error}`
        )
      })
    let validPassword = bcrypt.compareSync(auth.password, userFound!.password)
    if (!validPassword) {
      console.error(`[ERROR Authentication in ORM]: User Not Found`)
      throw new Error(`[ERROR Authentication in ORM]: User Not Found`)
    }
    //Generate JWT
    token = jwt.sign({ email: userFound!.email }, secret, {
      expiresIn: '2h',
    })
    return {
      user: userFound,
      token,
    }
  } catch (error) {
    LogError(`[ORM ERROR]: Creating User ${error}`)
  }
}
//Logout User
export const logoutUser = async (): Promise<any | undefined> => {}

export const getKatasFromUser = async (
  page: number,
  limit: number,
  id: string
): Promise<UserResponse | undefined> => {
  try {
    let userModel = userEntity()
    let katasModel = kataEntity()
    let katasFound: IKata[] = []
    let response: any = {
      katas: [],
    }
    await userModel
      .findById(id)
      .then(async (user: IUser) => {
        response.user = user.email
        let objectIds: mongoose.Types.ObjectId[] = []
        user.katas.forEach((kataId: string) => {
          let objectID = new mongoose.Types.ObjectId(kataId)
          objectIds.push(objectID)
        })
        await katasModel
          .find({ _id: { $in: objectIds } })
          .then((katas: IKata[]) => {
            katasFound = katas
          })
      })
      .catch((error) => {
        LogError(`[ORM ERROR]: Obtaining User ${error}`)
      })
    response.katas = katasFound
    // Count total documents in collections "Users"
    await userModel.countDocuments().then((total: number) => {
      response.totalPages = Math.ceil(total / limit) //total number pages
      response.currentPage = page
    })

    return response
  } catch (error) {
    LogError(`[ORM ERROR]: Getting All Users ${error}`)
  }
}

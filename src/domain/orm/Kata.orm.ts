import { kataEntity } from '../entities/Kata.entity'
import { LogSuccess, LogError } from '../../utils/logger'
import { IKata } from '../interfaces/IKata.interface'
import dotenv from 'dotenv'

//Enviroment variables
dotenv.config()
//CRUD
/**
 * Method to obtain all Katas from Collection "Katas" in Mongo Sever
 */
export const getAllKatas = async (
  page: number,
  limit: number
): Promise<any | undefined> => {
  try {
    let kataModel = kataEntity()
    let response: any = {}
    // Search all users
    await kataModel
      .find({ isDeleted: false })
      .limit(limit)
      .skip((page - 1) * limit)
      .exec()
      .then((katas: IKata[]) => {
        katas.forEach((kata: IKata) => {
          response.katas = katas
        })
      })
    // Count total documents in collections "Kata"
    await kataModel.countDocuments().then((total: number) => {
      response.totalPages = Math.ceil(total / limit) //total number pages
      response.currentPage = page
    })

    return response
  } catch (error) {
    LogError(`[ORM ERROR]: Getting All Katas ${error}`)
  }
}
//-Get Kata By Id
export const getKataByID = async (id: string): Promise<any | undefined> => {
  try {
    let kataModels = kataEntity()
    //Search Kata By ID
    return await kataModels.findById(id)
  } catch (error) {
    LogError(`[ORM ERROR]: Getting Kata By ID ${error}`)
  }
}
//-Delete Kata By Id
export const deleteKataByID = async (id: string): Promise<any | undefined> => {
  try {
    let kataModel = kataEntity()
    //Delete Kata BY ID
    return await kataModel.deleteOne({ _id: id })
  } catch (error) {
    LogError(`[ORM ERROR]: Deleting Kata By ID ${error}`)
  }
}
//-Create new Kata
export const createKata = async (kata: IKata): Promise<any | undefined> => {
  try {
    let kataModel = kataEntity()
    //Create / Insert new Kata
    return await kataModel.create(kata)
  } catch (error) {
    LogError(`[ORM ERROR]: Creating Kata ${error}`)
  }
}
//-Update Kata By Id
export const updateKataByID = async (
  id: string,
  kata: IKata
): Promise<any | undefined> => {
  try {
    let kataModel = kataEntity()
    return await kataModel.findByIdAndUpdate(id, kata)
  } catch (error) {
    LogError(`[ORM ERROR]: Updating Kata ${id}: ${error}`)
  }
}

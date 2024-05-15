import { IKata } from '../../domain/interfaces/IKata.interface'
import { IAuth } from '../../domain/interfaces/IAuth.interface'
import { IUser } from '../../domain/interfaces/IUser.interface'
import { BasicResponse } from '../types' //because the file is called index it can be improted without naming it

export interface IHelloController {
  getMessage(name?: string): Promise<BasicResponse>
}

export interface IUserController {
  // Read all users from database || get User by id
  getUsers(page: number, limit: number, id?: string): Promise<any>
  //Get all katas of a User
  getKatas(page: number, limit: number, id: string): Promise<any>
  //Delete user by id
  deleteUser(id?: string): Promise<any>
  //Update user
  updateUser(id: string, user: any): Promise<any>
}

export interface IAuthController {
  // register users
  registerUser(user: IUser): Promise<any>
  //login user
  loginUser(auth: IAuth): Promise<any>
  //Logout
  logoutUser(): Promise<any>
}

export interface IKataController {
  // Read all katas from database || get kata by id
  getKatas(page: number, limit: number, id?: string): Promise<any>
  //Create New kata
  createKata(kata: IKata): Promise<any>
  //Delete Kata by id
  deleteKata(id?: string): Promise<any>
  //Update Kata
  updateKata(id: string, kata: IKata): Promise<any>
}

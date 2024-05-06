import { BasicResponse } from '../types' //because the file is called index it can be improted without naming it

export interface IHelloController {
  getMessage(name?: string): Promise<BasicResponse>
}

export interface IUserController {
  // Read all users from database || get User by id
  getUsers(id?: string): Promise<any>
}

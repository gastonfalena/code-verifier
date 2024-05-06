import { Get, Put, Delete, Query, Route, Tags, Post } from 'tsoa'
import { IUserController } from './interfaces'
import { LogSuccess, LogError, LogWarning } from '../utils/logger'
import {
  deleteUserByID,
  getAllUsers,
  getUserByID,
  updateUserByID,
} from '../domain/orm/User.orm'

@Route('/api/users')
@Tags('UserController')
export class UserController implements IUserController {
  /**
   * @param {string} id Id of user to retreive (optional)
   * @returns All user or user found by Id
   */
  @Get('/')
  public async getUsers(@Query() id?: string): Promise<any> {
    let response: any = ''
    if (id) {
      LogSuccess(`[/api/users] Get User BY ID: ${id}`)
      response = await getUserByID(id)
    } else {
      LogSuccess('[/api/users] Get All Users Request')
      const response = await getAllUsers()
    }
    return response
  }
  /**
   * @param {string} id Id of user to delete (optional)
   * @returns message iforming if deletion was correct
   */
  @Delete('/')
  public async deleteUser(@Query() id?: string): Promise<any> {
    let response: any = ''
    if (id) {
      LogSuccess(`[/api/users] Delete User BY ID: ${id}`)
      await deleteUserByID(id).then((r) => {
        response = {
          message: `User whit id ${id} deleted successfully`,
        }
      })
    } else {
      LogWarning('[/api/users] Delete User Request WITHOUT ID')
      const response = {
        message: 'Pleasem,provde and ID to remove from database ',
      }
    }
    return response
  }
  /**
   * @param {string} id Id of user to retreive (optional)
   * @returns All user or user found by Id
   */
  @Post('/')
  public async createUser(user: any): Promise<any> {
    let response: any = ''

    await this.createUser(user).then((r) => {
      LogSuccess(`[/api/users] Create User: ${user}`)
      response = {
        message: `User created: ${user.name}`,
      }
    })
    return response
  }
  @Put('/')
  public async updateUser(@Query() id: string, user: any): Promise<any> {
    let response: any = ''
    if (id) {
      LogSuccess(`[/api/users] Update User BY ID: ${id}`)
      await updateUserByID(id, user).then((r) => {
        response = {
          message: `User whit id ${id} update successfully`,
        }
      })
    } else {
      LogWarning('[/api/users] Update User Request WITHOUT ID')
      const response = {
        message: 'Please,provide and ID to update an existing user',
      }
    }
    return response
  }
}

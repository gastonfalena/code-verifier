import { Get, Query, Route, Tags } from 'tsoa'
import { IUserController } from './interfaces'
import { LogSuccess, LogError } from '../utils/logger'
import { getAllUsers, getUserByID } from '../domain/orm/User.orm'

@Route('/api/users')
@Tags('UserController')
export class UserController implements IUserController {
  /**
   * Endpoint to retreive the Users in DB
   */
  @Get('/')
  public async getUsers(@Query() id?: string): Promise<any> {
    let response: any = ''
    if (id) {
      LogSuccess(`[/api/users] Get User BY ID: ${id}`)
      reponse = await getUserByID(id)
    } else {
      LogSuccess('[/api/users] Get All Users Request')
      const response = await getAllUsers()
    }
    return response
  }
}

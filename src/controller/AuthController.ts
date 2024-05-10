import { Get, Put, Delete, Query, Route, Tags, Post } from 'tsoa'
import { IAuthController } from './interfaces'
import { LogSuccess, LogError, LogWarning } from '../utils/logger'
import { IUser } from '../domain/interfaces/IUser.interface'
import { IAuth } from '../domain/interfaces/IAuth.interface'
import {
  registerUser,
  loginUser,
  logoutUser,
  getUserByID,
} from '../domain/orm/User.orm'
import { AuthResponse, ErrorResponse } from './types'

@Route('/api/auth')
@Tags('AuthController')
export class AuthController implements IAuthController {
  @Post('/register')
  public async registerUser(user: IUser): Promise<any> {
    let response: any = ''

    if (user) {
      LogSuccess(`[/api/auth/register] Register User: ${user}`)
      await registerUser(user).then((r) => {
        response = {
          message: `User created: ${user.name}`,
        }
      })
    } else {
      LogError('[/api/auth] Register needs User')
      response = {
        message:
          'User not Registered: Please, provide a User Entity to create one',
      }
    }
    return response
  }
  @Post('/login')
  public async loginUser(auth: IAuth): Promise<any> {
    let response: AuthResponse | ErrorResponse | undefined
    if (auth) {
      LogSuccess(`[/api/auth/login] Login User: ${auth.email}`)
      let data = await loginUser(auth)
      response = {
        token: data.token,
        message: `Welcome, ${data.user.name}`,
      }
    } else {
      LogError('[/api/auth] Register needs Auth entity')
      response = {
        error: '[ATUH ERROR]: Email & Password are needed',
        message: 'Please, provide a Email && password to login',
      }
    }
    return response
  }
  /**
   * @param {string} id Id of user to retreive (optional)
   * @returns All user or user found by Id
   */
  @Get('/me')
  public async userData(@Query() id: string): Promise<any> {
    let response: any = ''
    if (id) {
      LogSuccess(`[/api/users] Get User Data By ID: ${id}`)
      response = await getUserByID(id)
    }
    return response
  }
  @Post('/logout')
  public async logoutUser(): Promise<any> {
    let response: any = ''

    throw new Error('hola')
  }
}

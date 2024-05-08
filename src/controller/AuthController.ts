import { Get, Put, Delete, Query, Route, Tags, Post } from 'tsoa'
import { IAuthController } from './interfaces'
import { LogSuccess, LogError, LogWarning } from '../utils/logger'
import { IUser } from '../domain/interfaces/IUser.interface'
import { IAuth } from '../domain/interfaces/IAuth.interface'
import { registerUser, loginUser, logoutUser } from '../domain/orm/User.orm'

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
        message: 'Please, provide a User Entity to create one',
      }
    }
    return response
  }
  @Post('/login')
  public async loginUser(auth: IAuth): Promise<any> {
    let response: any = ''
    if (auth) {
      LogSuccess(`[/api/auth/login] Login User: ${auth.email}`)
      await loginUser(auth).then((r) => {
        LogSuccess(`[/api/auth/login] Create User: ${auth.email}`)
        response = {
          message: `User login in successfully: ${auth.email}`,
          token: r.token, // JWT generated for logged in user
        }
      })
    } else {
      LogError('[/api/auth] Register needs Auth entity')
      response = {
        message: 'Please, provide a Email && password to login',
      }
    }
    return response
  }
  @Post('/logout')
  public async logoutUser(): Promise<any> {
    let response: any = ''

    throw new Error('hola')
  }
}

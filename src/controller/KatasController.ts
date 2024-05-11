import { IKataController } from './interfaces'
import { Get, Put, Delete, Query, Route, Tags, Post } from 'tsoa'
import { LogSuccess, LogError, LogWarning } from '../utils/logger'
import {
  deleteKataByID,
  getAllKatas,
  getKataByID,
  updateKataByID,
  createKata,
} from '../domain/orm/Kata.orm'
import { IKata } from '@/domain/interfaces/IKata.interface'

@Route('/api/katas')
@Tags('KatasController')
export class KatasController implements IKataController {
  /**
   * @param {string} id Id of kata to retreive (optional)
   * @returns All kata or kata found by Id
   */
  @Get('/')
  public async getKatas(
    @Query() page: number,
    @Query() limit: number,
    @Query() id?: string
  ): Promise<any> {
    let response: any = ''
    if (id) {
      LogSuccess(`[/api/users] Get Kata BY ID: ${id}`)
      response = await getKataByID(id)
    } else {
      LogSuccess('[/api/users] Get All Kata Request')
      const response = await getAllKatas(page, limit)
    }
    return response
  }
  @Post('/register')
  public async createKata(kata: IKata): Promise<any> {
    let response: any = ''

    if (kata) {
      LogSuccess(`[/api/katas] Register Kata: ${kata}`)
      await createKata(kata).then((r) => {
        response = {
          message: `User created: ${kata.name}`,
        }
      })
    } else {
      LogError('[/api/katas] Register needs Kata')
      response = {
        message:
          'User not Registered: Please, provide a Kata Entity to create one',
      }
    }
    return response
  }
  /**
   * Endpoint to delete the katas in the collections "katas" of db
   * @param {string} id Id of kata to DELETE (optional)
   * @returns Message informingi f deletion was correct
   */
  @Delete('/')
  public async deleteKata(@Query() id?: string): Promise<any> {
    let response: any = ''
    if (id) {
      LogSuccess(`[/api/Katas] Delete Kata BY ID: ${id}`)
      await deleteKataByID(id).then((r) => {
        response = {
          message: `Kata whit id ${id} deleted successfully`,
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

  @Put('/')
  public async updateKata(@Query() id: string, kata: IKata): Promise<any> {
    let response: any = ''
    if (id) {
      LogSuccess(`[/api/katas] Update katas BY ID: ${id}`)
      await updateKataByID(id, kata).then((r) => {
        response = {
          message: `Kata whit id ${id} update successfully`,
        }
      })
    } else {
      LogWarning('[/api/katas] Update Katas Request WITHOUT ID')
      const response = {
        message: 'Please,provide and ID to update an existing kata',
      }
    }
    return response
  }
}

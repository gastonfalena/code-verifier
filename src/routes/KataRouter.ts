import express, { Request, Response } from 'express'
import { KatasController } from '../controller/KatasController'
import { LogInfo } from '../utils/logger'
import bodyParser, { json } from 'body-parser'
import { verifyToken } from '../middlewares/verifyToken.middleware'
import { IKata, KataLevel } from '../domain/interfaces/IKata.interface'

let jsonParser = bodyParser.json()
//Router from express

let kataRouter = express.Router()

// http://localhost:8000/api/users?id=askdopask12o3
kataRouter
  .route('/')
  //Get:
  .get(verifyToken, async (req: Request, res: Response) => {
    //Obtain query param (ID)
    let id: any = req?.query?.id

    // Pagination
    let page: any = req?.query?.page || 1
    let limit: any = req?.query?.limit || 10
    LogInfo(`Query Param: ${id}`)
    const controller: KatasController = new KatasController()
    // Obtain response

    const response = await controller.getKatas(page, limit, id)
    //Send to the client the response
    return res.status(200).send(response)
  })
  .delete(verifyToken, async (req: Request, res: Response) => {
    //Obtain query param (ID)
    let id: any = req?.query?.id
    LogInfo(`Query Param: ${id}`)
    const controller: KatasController = new KatasController()
    // Obtain response
    const response = await controller.deleteKata(id)
    return res.status(200).send(response)
  })
  .post(jsonParser, verifyToken, async (req: Request, res: Response) => {
    //Obtain query param (ID)
    let id: any = req?.query?.id
    //read from body
    let name: string = req?.body?.name
    let description: string = req?.body?.description || 'Default description'
    let level: KataLevel = req?.body?.level || KataLevel.BASIC
    let intents: number = req?.body?.intens || 0
    let starts: number = req?.body?.starts || 0
    let creator: string = req?.body?.creator
    let solution: string = req?.body?.solution || 'Default Solution'
    let participants: string[] = req?.body?.participants || ['a']

    if (
      name &&
      description &&
      level &&
      intents >= 0 &&
      starts >= 0 &&
      creator &&
      solution &&
      participants.length >= 0
    ) {
    } else {
      return res.status(400).send({
        message: `[ERROR]: Creating Kata. You need to send all atrrs of Kata update it`,
      })
    }
    const controller: KatasController = new KatasController()
    let kata: IKata = {
      name: name,
      description: description,
      level: level,
      intents: intents,
      starts: starts,
      creator: creator,
      solution: solution,
      participants: participants,
    }
    // Obtain response
    const response = await controller.createKata(kata)
    return res.status(201).send(response)
  })
  .put(jsonParser, verifyToken, async (req: Request, res: Response) => {
    //Obtain query param (ID)
    let id: any = req?.query?.id
    //read from body
    let name: string = req?.body?.name
    let description: string = req?.body?.description || ''
    let level: KataLevel = req?.body?.level || KataLevel.BASIC
    let intents: number = req?.body?.intens || 0
    let starts: number = req?.body?.starts || 0
    let creator: string = req?.body?.creator || ''
    let solution: string = req?.body?.solution || ''
    let participants: string[] = req?.body?.participants || []

    if (
      name &&
      description &&
      level &&
      intents &&
      starts &&
      creator &&
      solution &&
      participants
    ) {
    } else {
      return res.status(400).send({
        message: `[ERROR]: Updating Kata. You need to send all atrrs of Kata update it`,
      })
    }
    const controller: KatasController = new KatasController()
    let kata: IKata = {
      name: name,
      description: description,
      level: level,
      intents: intents,
      starts: starts,
      creator: creator,
      solution: solution,
      participants: participants,
    }
    // Obtain response
    const response = await controller.updateKata(id, kata)
    return res.status(204).send(response)
  })

//Export Hello Router
export default kataRouter
/**
 * Get documents => 200 OK
 * Creation docuemnts => 201 OK
 * Deletion of documents =>200 (Entity) / 204 (no return)
 * Update of documents => 200 (Entity) / 204 (no return)
 */

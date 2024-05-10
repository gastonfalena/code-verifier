import express, { Request, Response } from 'express'
import { UserController } from '../controller/UserController'
import { LogInfo } from '../utils/logger'
import bodyParser from 'body-parser'
import { verifyToken } from '@/middlewares/verifyToken.middleware'

let jsonParser = bodyParser.json()
//Router from express

let userRouter = express.Router()

// http://localhost:8000/api/users?id=askdopask12o3
userRouter
  .route('/')
  //Get:
  .get(verifyToken, async (req: Request, res: Response) => {
    //Obtain query param (ID)
    let id: any = req?.query?.id

    // Pagination
    let page: any = req?.query?.page || 1
    let limit: any = req?.query?.limit || 10
    LogInfo(`Query Param: ${id}`)
    const controller: UserController = new UserController()
    // Obtain response

    const response = await controller.getUsers(page, limit, id)
    //Send to the client the response
    return res.status(200).send(response)
  })
  .delete(verifyToken, async (req: Request, res: Response) => {
    //Obtain query param (ID)
    let id: any = req?.query?.id
    LogInfo(`Query Param: ${id}`)
    const controller: UserController = new UserController()
    // Obtain response
    const response = await controller.deleteUser(id)
    return res.status(200).send(response)
  })
  .put(verifyToken, async (req: Request, res: Response) => {
    //Obtain query param (ID)
    let id: any = req?.query?.id
    let name: any = req?.query?.name
    let email: any = req?.query?.email
    let age: any = req?.query?.age
    LogInfo(`Query Param: ${id},${name},${email},${age}`)
    const controller: UserController = new UserController()
    let user = {
      name: name,
      email: email,
      age: age,
    }
    // Obtain response
    const response = await controller.updateUser(id, user)
    return res.status(204).send(response)
  })

//Export Hello Router
export default userRouter
/**
 * Get documents => 200 OK
 * Creation docuemnts => 201 OK
 * Deletion of documents =>200 (Entity) / 204 (no return)
 * Update of documents => 200 (Entity) / 204 (no return)
 */

import express, { Request, Response } from 'express'
import { UserController } from '../controller/UserController'
import { LogInfo } from '../utils/logger'

//Router from express

let userRouter = express.Router()

// http://localhost:8000/api/users?id=askdopask12o3
userRouter
  .route('/')
  //Get:
  .get(async (req: Request, res: Response) => {
    //Obtain query param (ID)
    let id: any = req?.query?.id
    LogInfo(`Query Param: ${id}`)
    const controller: UserController = new UserController()
    // Obtain response
    const response = await controller.getUsers(id)
    //Send to the client the response
    return res.send(response)
  })

//Export Hello Router
export default userRouter

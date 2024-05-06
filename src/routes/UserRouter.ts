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
  .delete(async (req: Request, res: Response) => {
    //Obtain query param (ID)
    let id: any = req?.query?.id
    LogInfo(`Query Param: ${id}`)
    const controller: UserController = new UserController()
    // Obtain response
    const response = await controller.deleteUser(id)
    return res.send(response)
  })
  //POST:
  .post(async (req: Request, res: Response) => {
    let name: any = req?.query?.name
    let email: any = req?.query?.email
    let age: any = req?.query?.age

    const controller: UserController = new UserController()
    let user = {
      name: name,
      email: email,
      age: age,
    }
    // Obtain response
    const response = await controller.createUser(user)
    return res.send(response)
  })
  .put(async (req: Request, res: Response) => {
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
    return res.send(response)
  })

//Export Hello Router
export default userRouter

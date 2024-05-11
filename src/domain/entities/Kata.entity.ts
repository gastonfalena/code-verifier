import { IKata } from '../interfaces/IKata.interface'
import mongoose from 'mongoose'
import { IUser } from '../interfaces/IUser.interface'

export const kataEntity = () => {
  // let userSchema = new mongoose.Schema({
  //   name: String,
  //   email: String,
  //   age: Number,
  // })

  let kataSchema = new mongoose.Schema<IKata>({
    name: { type: String, required: true },
    description: { type: String, required: true },
    level: { type: String, required: true },
    intents: { type: Number, required: true },
    starts: { type: Number, required: true },
    creator: { type: String, required: true }, // Id of user
    solution: { type: String, required: true },
    participants: { type: [], required: true },
  })
  return mongoose.models.Katas || mongoose.model<IKata>('Katas', kataSchema)
}

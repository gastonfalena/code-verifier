import { BasicResponse } from '../types' //because the file is called index it can be improted without naming it
//

export interface IHelloController {
  getMessage(name?: string): Promise<BasicResponse>
}

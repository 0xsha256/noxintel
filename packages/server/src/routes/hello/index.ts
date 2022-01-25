import { Application, Request, Response } from 'express'
import { Resource } from '../../utils/auto-route'

export default () => <Resource>{
  get: (_, res: Response) => {
    res.status(200).send('Hello, Route!').end()
  }
}
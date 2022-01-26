import express from 'express'
import db from './db'
import compression from 'compression'
import { config } from 'dotenv'
import message from './utils/messages/system'
import routes from './utils/auto-route'
import path from 'path'
import unitRegister from './services/units'

config()

const app = express()
const prod = process.env.NODE_ENV === 'prod'

app.use(compression())

app.listen(4000, () => {
  message(prod)
  db(prod)
  unitRegister('no')
  routes(app, {
    dir: path.resolve(__dirname, './routes') // relative to your cwd
  })
})

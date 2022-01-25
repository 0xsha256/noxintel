import express from 'express'
import './db'
import compression from 'compression'
import { config } from 'dotenv'
import message from './utils/messages/system'
import routes from './utils/auto-route'
import path from 'path'
import unitRegister from './services/unit-register'

config()

const app = express()

app.use(compression())

app.listen(4000, () => {
  unitRegister()
  /*  message()
  routes(app, {
    dir: path.resolve(__dirname, './routes') // relative to your cwd
  }) */
})

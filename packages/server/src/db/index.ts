import mongoose from 'mongoose'
import { config } from 'dotenv'
import consola from 'consola'
config()

mongoose
  .connect(`mongodb://localhost:2717/${process.env.DB_NAME}`)
  .then(() => consola.success('Database connected'))
  .catch(err => consola.error(err))


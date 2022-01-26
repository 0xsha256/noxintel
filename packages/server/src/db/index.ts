import mongoose from 'mongoose'
import { config } from 'dotenv'
import consola from 'consola'
config()

export default (prod: boolean) => {
  mongoose
    .connect(`mongodb://localhost:2717/${process.env.DB_NAME}`)
    .then(() => prod ? '' : consola.success('Database connected'))
    .catch(err => prod ? '' : consola.error(err))
}


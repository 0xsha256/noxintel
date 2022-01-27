import { MongoClient, Db } from 'mongodb'
import { config } from 'dotenv'
import consola from 'consola'
config()
const prod = process.env.NODE_ENV === 'prod'

const client = new MongoClient(`mongodb://localhost:2717/${process.env.DB_NAME}?retryWrites=true&writeConcern=majority`)

client.connect()
  .then(() => prod ? '' : consola.success('Database connected'))
  .catch(err => prod ? '' : consola.error(err))

export default client.db(process.env.DB_NAME) as Db


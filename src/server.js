import express from 'express'
import { json, urlencoded } from 'body-parser'
import morgan from 'morgan'
import cors from 'cors'
import { signup, signin, protect } from './utils/auth'
import { connect } from './utils/db'
import userRouter from './resources/user/user.router'
import itemRouter from './resources/item/item.router'

require('../.env')
export const app = express()

app.disable('x-powered-by')

app.use(cors())
app.use(json())
app.use(urlencoded({ extended: true }))
app.use(morgan('dev'))

app.post('/signup', signup)
app.post('/signin', signin)

app.use('/api', protect)
app.use('/api/user', userRouter)
app.use('/api/item', itemRouter)

const { DB_URL, PORT } = process.env

export const start = async () => {
  try {
    await connect(DB_URL)
    app.listen(PORT || 5000, () => {
      console.log(`Server started at ${PORT}`)
    })
  } catch (e) {
    console.error(e)
  }
}

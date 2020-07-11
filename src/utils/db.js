import mongoose from 'mongoose'

export const connect = (url, opts = {}) => {
  return mongoose.connect(url, { ...opts, useNewUrlParser: true })
}

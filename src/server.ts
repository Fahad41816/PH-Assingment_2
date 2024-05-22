import mongoose from 'mongoose'
import config from './app/config'
import app from './app'

function Main() {
  try {
    mongoose.connect(config.DATABASE_URL as string)
      .then(() => {
        console.log('Database Connected...')
      })
      .catch(err => console.log(err))

        app.listen(config.PORT, () => {
        console.log(`Example app listening on port ${config.PORT}`)
        })
  } catch (error) {
    console.log(error)
  } 
}

Main()

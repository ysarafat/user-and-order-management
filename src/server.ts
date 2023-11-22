import mongoose from 'mongoose'
import app from './app'
import config from './config'
const PORT = config.port || 5000
async function main() {
  try {
    mongoose.connect(config.database_url as string).then(() => {
      console.log('Database connected')
    })
    app.listen(PORT, () => {
      console.log(`server is running on port ${PORT}`)
    })
  } catch (error) {
    console.log(error)
  }
}

main()

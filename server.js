
const dotenv = require('dotenv')
const mongoose = require('mongoose')
dotenv.config({ path: './config.env' })

const app = require('./src/app')

//Get all env
// console.log(process.env)

const DB = process.env.DATABASE_URI.replace('<PASSWORD>', process.env.DATABASE_PASSWORD)

mongoose.connect(DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
}).then(() => console.log('DB Connection Successful!'))
  .catch((err) => console.log(err))


const port = process.env.PORT || 5020

app.listen(port, () => {
  console.log(`App running on port ${port}`)
})
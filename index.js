const app = require("./app")
const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()

const PORT = process.env.PORT || 8000


app.get('/', (req, res) => {
  res.send('Blood donation server!')
})


const connectDb = async () => {
  try {
    await mongoose.connect(process.env.CONNECTDB)
    console.log('Database is Connect')
  } catch (error) {
    console.log('Falied to Connect Database')
  }
}

app.listen(PORT, () => {
  console.log(` Server listening on port ${PORT}`)
  connectDb()
})
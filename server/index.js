import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import User from "./models/UserModel.js";
import path from "path"

const app = express()
const PORT = process.env.PORT || 5000;

app.use(express.json())
app.use(cors())
app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}...`)
})

const db = 'mongodb+srv://izzahaj:mcAf8a36PRWdHi1Z@hangman-project.pxnpk.mongodb.net/?retryWrites=true&w=majority'

mongoose.connect(db, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("Database connected...")
})

app.get('/api/users', async (req, res) => {
  const users = await User.find({}).sort({ "score": -1, "username": 1 }).limit(15)
  try {
    res.status(200).json({
      status: 'Success',
      data: { users }
    })
  } catch(err) {
    res.status(500).json({
      status: 'Failed',
      message: err
    })
  }
})

app.post('/api/add-user', async(req, res) => {
  const user = new User(req.body)
  try {
    await user.save()
    res.status(201).json({
      status: 'Success',
      data: { user }
    })
  } catch(err) {
    res.status(500).json({
      status: 'Failed',
      message: err
    })
  }
})

if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging') {
  app.use(express.static('client/build'))
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html'))
  })
}
import express, { Application } from 'express'
import users from "./router/users";
import board from "./router/board";
import auth from "./router/auth";
import comment from "./router/comment";

const app: Application = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
  res.header(
    'Access-Control-Allow-Headers',
    'Content-Type, Authorization'
  )
  next()
})

app.use('/users', users);
app.use('/board', board);
app.use('/auth', auth);
app.use('/comment', comment);

export default app;
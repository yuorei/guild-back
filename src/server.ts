import express, { Application } from 'express'
import users from "./router/users";
import auth from "./router/auth";

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
app.use('/auth', auth);

export default app;
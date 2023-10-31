import express, { Application } from 'express'
import * as usersRouter from "./routes/users";

const app: Application = express()


app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/users', usersRouter.getAllUser);
app.post('/users', usersRouter.createUser);

export default app;
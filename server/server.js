import express from 'express'
import mysql from 'mysql'
import cors from 'cors'
import { messageRouter } from './routes/messageRoutes.js'
import userRoute from './routes/userRoutes.js'
import fileUpload from 'express-fileupload'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import { groupRouter } from './routes/groupRoutes.js'

//App config
const app = express()
dotenv.config()
app.use(cookieParser())
app.use(express.json())
app.use(cors({
    methods : ["GET", "POST"] , 
    origin : 'http://localhost:3000' , 
    credentials : true
}))

const PORT = process.env.PORT || 5000

//DB config
export const db = mysql.createConnection({
    host : 'localhost' , 
    user : 'root' , 
    password : process.env.DB_PASSWORD , 
    database : 'whatsapp'
})

db.connect((err) => {
    if(err) console.log(err)

    console.log('Database is connected and running !')
    app.listen(PORT,() => console.log(`Listening on port ${PORT}`))
})

//API routes middleware
app.use('/message', messageRouter)
app.use('/user', userRoute)
app.use('/group', groupRouter)
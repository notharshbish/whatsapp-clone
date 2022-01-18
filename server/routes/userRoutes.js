import express from 'express'
import {db} from '../server.js'
import bcrypt, { genSalt, hash } from 'bcrypt'
import jwt from 'jsonwebtoken'

const userRoute = express.Router()

userRoute.post('/register', async (req,res) => {
    const {name , phone, picture, password, status} = req.body
    console.log(req.body)

    const salt = await genSalt(10)
    const hashedPassword = await hash(password, salt)

    db.query('select * from users where user_phone = ?', [phone], (err,data) => {
        if(data.length >= 1) res.status(400).send('Phone number is already taken')
    })

    db.query('insert into users (user_name,user_phone,user_password,user_picture,user_status) values (?,?,?,?,?)', [name,phone,hashedPassword,picture,status], (err,data) => {
        if(err) throw err 
        db.query('select last_insert_id()', (err, data) => {
            db.query('select * from users where user_id = ?',  [data[0]["last_insert_id()"]], (err,user) => {
                console.log(user[0])
                res.cookie('_ga', JSON.stringify(user[0])).end()
            })
        })
    })
})

userRoute.post('/all', async(req,res) => {
    db.query('select user_id, user_name, user_phone, user_status, user_picture from users where user_id <> ?', [req.body.id], (err,data) => {
        return res.json(data)
    })
})

userRoute.post('/login' , async(req,res) => {
    let user ; 
    const {phone, password} = req.body 
    db.query('select * from users where user_phone = ?' , [phone], async (err,data) => {
        if(data.length === 0) return res.status(400).send('Phone number or password is incorrect')
        user = data[0]
        const checkPassword = await bcrypt.compare(password, user.user_password)
        if(checkPassword === false) return res.status(400).send('Phone number or password is incorrect')
        res.cookie('_ga',JSON.stringify(user)).end()
    })
})

export default userRoute
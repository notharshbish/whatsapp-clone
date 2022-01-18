import express from 'express'
import {db} from '../server.js'

export const groupRouter = express.Router()


groupRouter.post('/add', async(req,res) => {
    const {users ,name, admin, desc, picture} =  req.body 
    users.push(admin)

    db.query('insert into groupss(group_name,group_desc,group_pic) values (?,?,?)', [name,desc,picture], (err,data) => {
        if(err) console.log('Group could not be created')
    })  

    db.query('select last_insert_id()', (err,data) => {
        users.map(u => {
            db.query('insert into members(group_id,group_admin,user_id,user_name,user_phone,user_picture,user_status,group_mute) values (?,?,?,?,?,?,?,?)', [data[0]["last_insert_id()"],u.user_id === admin.user_id ? true : false,u.user_id,u.user_name,u.user_phone,u.user_picture, u.user_status, false])
        })
    })
    res.end()
})


groupRouter.post('/all', async(req,res) => {
    db.query('select * from groupss where groupss.group_id in (select group_id from members where user_id = ?)', [req.body.id] ,(err,data) => {
        res.json(data)
    })
})


groupRouter.post('/send/:id' , async(req,res) => {
    db.query('insert into group_messages(message_text,message_time,message_from) values (?,?,?)', [req.body.text, req.body.time, req.body.userId])
    db.query('select last_insert_id()' , (err,id) => {
        db.query('insert into group_msgs values (?,?)' , [Number(req.params.id) , id[0]["last_insert_id()"]])
    })
    res.end()
})

groupRouter.get('/get/:id' , async (req,res) => {
    db.query('select this_msgs.message_id, this_msgs.message_text, this_msgs.message_time, this_msgs.message_from, users.user_name from users inner join (select * from group_messages where group_messages.message_id in (select message_id from group_msgs where group_id = ?)) this_msgs on users.user_id = this_msgs.message_from', [Number(req.params.id)] , (err,data) => {
        if(err) console.log(err)
        res.json(data)
    })
})

groupRouter.get('/users/:id' , async (req,res) => {
    db.query('select * from members where group_id = ?' , [Number(req.params.id)] , (err,data) => {
        if(err) console.log(err) 
        res.json(data)
    })
})
import express from 'express' 
import  {db} from '../server.js'

export const messageRouter = express.Router()

messageRouter.post('/send', async (req,res) => {
    const {message, sender , receiver,  time} = req.body

    db.query("insert into friend_messages(message_text, message_time,message_to) values (?,?,?)", [message, time,receiver] , (err,data) => {
        if(err) console.log(err)
        console.log('Message was inserted successfully!')
    })
    db.query('select last_insert_id()', (err,id) => {
        db.query('insert into message_log values (?,?,?,?,?,?)', [id[0]["last_insert_id()"],sender,message,time,receiver,false], (err,data) => {
            console.log('Message logged successfully')
            res.end()
        })
    })
    res.end()
})

messageRouter.post('/all', (req,res) => {
    const {senderId , receiverId} = req.body
    db.query('select * from message_log where (user_id,message_to) in ((?,?),(?,?))', [senderId,receiverId,receiverId,senderId], (err,data) => {
        if(err) console.log('Could not get data')
        res.json(data)
    })
    // db.query('select new_msgs.message_id , new_msgs.message_receiver, new_msgs.message_sender, new_msgs.message_seen, new_msgs.message_text, messages.message_time from (select * from (select * from message_log where message_sender = ? or message_receiver = ?) this_msgs where message_sender = ? or message_receiver = ? ) new_msgs , messages where new_msgs.message_id = messages.message_id;  ', [receiverId, receiverId, senderId, senderId], (err,data) => {
    //     if(err) console.log(err) 
    //     // console.log(data)
    //     res.json(data)
    // })
})
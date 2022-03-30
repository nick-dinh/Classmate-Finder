const express = require('express');
const db = require('./env/database')
const cors = require('cors')

// cors and express
const app = express();
app.use(cors());
app.use(express.json())

// express server will run on localhost:5051
const PORT = 5051;

// express route to get every chatroom (DEBUG ONLY)
app.get("/api/getChats", (req, res) => {
    // select * from chatrooms
    db.query("SELECT * FROM chatrooms", (err, result) => { 
        if(err)
            throw err;
        else res.send(result)
    });   
});

// express route to get every message (DEBUG ONLY)
app.get("/api/getMsgs", (req, res) => {
    // select * from chatrooms (get all messages in db)
    db.query("SELECT * FROM messages", (err, result) => { 
        if(err)
            throw err;
        else res.send(result)
    });   
});

// express route to get all chatrooms from name
app.get("/api/getChatsFromName/:name", (req, res) => {
    let name = req.params.name;
    name = '%' + name + '%'
    //select * from chatrooms where users like '%nicholas%'
    db.query("SELECT * FROM chatrooms WHERE users like ?", name, (err, result) => {
        if(err)
            throw err;
        else res.send(result)
    });   
});

// express route to get all messages from chatid
app.get("/api/getMessagesFromID/:id", (req, res) => {
    const id = req.params.id;
    //select * from messages where chatroom_id = 1 order by timestamp
    db.query("SELECT * FROM messages WHERE chatroom_id = ? order by timestamp", id, (err, result) => {
        if(err)
            throw err;
        else res.send(result)
    });   
});

// express route to create a new chatroom with users
app.post('/api/createRoom', (req, res) => {
    const users = req.body.usersList;
    console.log(users)
    //insert into chatrooms (users) values ('nicholas, manning, sabrina, christine')
    db.query("INSERT INTO chatrooms (users) VALUES (?)", users, (err, result) => {
        if(err)
            throw err;
        else console.log(result)
        res.send("created!")
    });   
});

// express route to create a new message with username and chatid
app.post('/api/createMessage', (req, res) => {
    const username = req.body.userName;
    const msg = req.body.message;
    const chatid = req.body.chatID;
    //insert into messages (username, message, timestamp, chatroom_id) values ('apple', 'hello my name bob', CURRENT_TIME(), 2)
    db.query("INSERT INTO messages (username, message, timestamp, chatroom_id) VALUES (?,?,CURRENT_TIME(),?)", [username, msg, chatid], (err, result) => {
        if(err)
            throw err;
        else console.log(result)
        res.send("created!")
    });   
});

// broadcast port of express server
app.listen(PORT, ()=>{
    console.log(`Server listening on localhost port ${PORT}`)
})
const express = require('express');
const db = require('./env/database')
const cors = require('cors')

const app = express();
app.use(cors());
app.use(express.json())

// express server will run on localhost:5051
const PORT = 5051;

//------------- API routes for Group-Group & Private Chats ---------------//
// express route to get every chatroom (DEBUG ONLY)
app.get("/api/getChats", (req, res) => {
    // ex query: select * from chatrooms
    db.query("SELECT * FROM chatrooms", (err, result) => { 
        if(err)
            console.log(err);
        else res.send(result)
    });   
});

// express route to get every message (DEBUG ONLY)
app.get("/api/getMsgs", (req, res) => {
    // ex query: select * from chatrooms (get all messages in db)
    db.query("SELECT * FROM messages", (err, result) => { 
        if(err)
            console.log(err);
        else res.send(result)
    });   
});

// express route to get all chatrooms from name
app.get("/api/getChatsFromName/:name", (req, res) => {
    let name = req.params.name;
    name = '%' + name + '%'
    // ex query: select * from chatrooms where users like '%nicholas%'
    db.query("SELECT * FROM chatrooms WHERE users like ?", name, (err, result) => {
        if(err)
            console.log(err);
        else res.send(result)
    });   
});

// express route to get all messages from chatid
app.get("/api/getMessagesFromID/:id", (req, res) => {
    const id = req.params.id;
    // ex query: select * from messages where chatroom_id = 1 order by timestamp
    db.query("SELECT * FROM messages WHERE chatroom_id = ? order by timestamp", id, (err, result) => {
        if(err)
            console.log(err);
        else res.send(result)
    });   
});

// express route to create a new chatroom with users
app.post('/api/createRoom', (req, res) => {
    const users = req.body.usersList;
    console.log(users)
    // ex query: insert into chatrooms (users) values ('nicholas, manning, sabrina, christine')
    db.query("INSERT INTO chatrooms (users) VALUES (?)", users, (err, result) => {
        if(err)
            console.log(err);
        else console.log(result)
        res.send("created!")
    });   
});

// express route to create a new message with username and chatid
app.post('/api/createMessage', (req, res) => {
    const username = req.body.userName;
    const msg = req.body.message;
    const chatid = req.body.chatID;
    // ex query: insert into messages (username, message, timestamp, chatroom_id) values ('apple', 'hello my name bob', CURRENT_TIME(), 2)
    db.query("INSERT INTO messages (username, message, timestamp, chatroom_id) VALUES (?,?,CURRENT_TIME(),?)", [username, msg, chatid], (err, result) => {
        if(err)
            console.log(err);
        else console.log(result)
        res.send("created!")
    });   
});
//----------- end API routes for Group-Group & Private Chats --------------//



//--------------------- API routes for Social Posts -----------------------//
// express route to get every post
app.get("/api/getPosts", (req, res) => {
    // ex query: select * from post order by datecreated
    db.query("SELECT * FROM post order by timecreated DESC", (err, result) => { 
        if(err)
            console.log(err);
        else res.send(result)
    });   
});

// express route to get details from postid
app.get("/api/getPost/:id", (req, res) => {
    const id = req.params.id;
    // ex query: select * from post where postid = 1
    db.query("SELECT * FROM post WHERE postid = ?", id, (err, result) => {
        if(err)
            console.log(err);
        else res.send(result)
    });   
});

// express route to create a new post
app.post('/api/createPost', (req, res) => {
    const title = req.body.title;
    const author = req.body.author;
    const location = req.body.location;
    const body = req.body.body;
    const time = req.body.time;
    // ex query: insert into post (title,author,location,body,timecreated,scheduledtime) values (...)
    db.query("INSERT INTO post (title,author,location,body,timecreated,scheduledtime) VALUES (?,?,?,?,CURRENT_TIME(),?)", [title, author, location, body, time], (err, result) => {
        if(err)
            console.log(err);
        else console.log(result)
        res.send("created post!")
    });   
});

// express route to delete post
app.post('/api/deletePost/', (req, res) => {
    const id = req.body.id;
    // DELETE FROM table_name WHERE ...
    db.query("DELETE FROM post WHERE postid = ?", id, (err, result) => {
        if (err)
            console.log(err);
        else console.log(result)
        res.send("deleted post")
    });
});

// express route to update post
app.post('/api/updatePost/', (req, res) => {
    const id = req.body.id;
    console.log(title);
    const title = req.body.title;
    const location = req.body.location;
    const body = req.body.body;
    const time = req.body.time;
    // UPDATE table_name SET ... WHERE ...
    db.query("UPDATE post SET title = ?, location = ?, body = ?, scheduledtime = ? WHERE postid = ?", [title, location, body, time, id], (err, result) => {
        if(err)
            console.log(err);
        else console.log(result)
        res.send("updated post!")
    });   
});
//------------------- end API routes for Social Posts ---------------------//



//------------------- API routes for Social Comments ----------------------//
// express route to get all messages from post_id
app.get("/api/getCommentsFromID/:id", (req, res) => {
    const id = req.params.id;
    // ex query: select * from comments where post_id = 1 order by timestamp
    db.query("SELECT * FROM comments WHERE post_id = ? order by timestamp", id, (err, result) => {
        if(err)
            console.log(err);
        else res.send(result)
    });   
});

// express route to create new comments
app.post('/api/createComment', (req, res) => {
    const username = req.body.userName;
    const msg = req.body.message;
    const postid = req.body.postID;
    //  ex query: insert into comments (username, message, timestamp, post_id) values ('apple', 'hello my name bob', CURRENT_TIME(), 2)
    db.query("INSERT INTO comments (username, message, timestamp, post_id) VALUES (?,?,CURRENT_TIME(),?)", [username, msg, postid], (err, result) => {
        if(err)
            console.log(err);
        else console.log(result)
        res.send("created!")
    });   
});
//------------------ end API routes for Social Comments -------------------//



app.listen(PORT, ()=>{
    console.log(`Server listening on localhost port ${PORT}`)
})
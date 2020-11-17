const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5757;

//bodyparser for jquery
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + '/public'));

//connect to sqlite
const dbFile = __dirname + '/database/notes.db';
let db = new sqlite3.Database(dbFile, sqlite3.OPEN_READWRITE, (err) => {
    if(err){
        console.log(err.message);
    }else{
        console.log('db connected!');
    }
});
//create table
/*
const sql_create = `CREATE TABLE IF NOT EXISTS Notes(
    Note_ID INTEGER PRIMARY KEY AUTOINCREMENT,
    Title VARCHAR(100) NOT NULL,
    Content TEXT NOT NULL);`;
db.run(sql_create, err => {
    if (err) {
        console.error(err.message);
    }else{
        console.log("Table Created");
    }
});
*/

//render html
app.get('/', (req, res) => {
    res.sendFile('/public/index.html');
});

//get, post, put, delete data
//1. get
app.get('/notes', (req, res) => {
    const query = 'SELECT * FROM Notes ORDER BY Note_ID';
    db.all(query, [], (err, rows) => {
        if(err){
            console.log(err.message); 
        }else{
            //res.render('notes', {model: rows});
            console.log('display success');
            console.log(rows);
            res.json({rows});
        }
    });
});
//2. post
app.post("/create", (req, res) => {
    const query = "INSERT INTO Notes (Title, Content) VALUES (?, ?)";
    const note = [req.body.Title, req.body.Content];
    //const note = [];
    db.run(query, note, err => {
        if(err){
            console.log(err.message);
        }else{
            console.log('create new note success');
            res.json({note});
            //res.redirect("/notes");
        }
    });
});
//3. put
app.post("/edit/:id", (req, res) => {
    const id = req.params.id;
    const note = [req.body.Title, req.body.Content, id];
    const query = "UPDATE Notes SET Title = ?, Content = ? WHERE (Note_ID = ?)";
    db.run(query, note, err => {
        if(err){
            console.log(err.message);
        }else{
            console.log('update success');
            res.json({note});
        }
    });
});
//4. delete
app.post("/delete/:id", (req, res) => {
    const id = req.params.id;
    const query = "DELETE FROM Notes WHERE Note_ID = ?";
    db.get(query, id, (err, row) => {
        if(err){
            console.log(err.message);
        }else{
            console.log('delete note success');
            res.json({id});
            //res.render("delete", { model: row });
        }
    });
});
//app listen
app.listen(port, () => {
    console.log(`server started at ${port}`);
});
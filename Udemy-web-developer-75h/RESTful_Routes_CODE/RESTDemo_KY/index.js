
const express = require('express');
const app = express();
const path = require('path');
const methodOverride = require('method-override')
const { v4: uuid } = require('uuid');

 

app.use(express.urlencoded({ extended : true}))
app.use(express.json())
app.use(methodOverride('_method'))
app.set('views',path.join(__dirname,'views'))
app.set('view engine', 'ejs')


let comments = [
    {
        id : uuid(),
        username : 'kyoungyeob',
        comment : 'I like reading book & whisky'
    },

    {
        id : uuid(),
        username : 'Skyler',
        comment : 'I like to go birdwatching with my dog'
    },

    {
        id : uuid(),
        username : 'kyounghoon',
        comment : 'I like to learn everything'
    }
]
app.get('/comments', (req,res) => {
    res.render('comments/index', {comments})
})

app.get('/comments/new', (req,res) => {
    res.render('comments/new')
})

app.post('/comments', (req, res) => {
    const { username, comment } = req.body;
    comments.push({ username, comment, id: uuid() })
    res.redirect('/comments');
})

app.get('/comments/:id', (req, res) => {
    const { id } = req.params;
    const comment = comments.find(c => c.id === id);
    res.render('comments/show', { comment })
})

app.get('/comments/:id/edit', (req, res) => {
    const { id } = req.params;
    const comment = comments.find(c => c.id === id);
    res.render('comments/edit', { comment })
})


// app.post('/comments', (req,res) => {  //연습용 post 명령
//     const { username, comment } = req.body
//     comments.push({ username,comment })
//     // res.send("it worked!")
//     res.render('comments/index', {comments})
// })

app.patch('/comments/:id', (req, res)=>{
    const { id } = req.params;
    const newCommentText = req.body.comment;
    const foundComment = comments.find( c => c.id === id);
    foundComment.comment = newCommentText;
    res.redirect('/comments');
})

app.delete('/comments/:id',(req,res)=>{
    const { id } = req.params;
    comments = comments.filter( c=> c.id !== id);
    res.redirect('/comments');
})

app.get('/tacos', (req, res) => {
    res.send("GET /tacos response")
})

app.post('/tacos',(req,res)=>{
    const {meat, qty} = req.body;
    res.send(`OK 경엽, here are your ${qty} ${meat} tacos`);
})

app.listen(3000, () => {
    console.log("ON PORT 3000!")
})

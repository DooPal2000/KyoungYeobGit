const express = require('express');
const app = express();
const session = require('express-session');

const sessionOptions = { secret: 'thisisnotagoodsecret', resave: false, saveUninitialized: false }
// https://fierycoding.tistory.com/36
// app.use(session(sessionOptions));
app.use(session(sessionOptions));

app.get('/viewcount', (req, res) => {
    if (req.session.count) {
        req.session.count += 1;
    } else { // count는 존재하지 않으나, 최초 1회 이곳으로 와서 count를 '1'로 세팅한다.
        req.session.count = 1;
    }
    res.send(`You have viewed this page ${req.session.count} times`)
})

app.get('/register', (req, res) => {
    const { username = 'Anonymous' } = req.query;
    req.session.username = username;
    res.redirect('/greet')
})

app.get('/greet', (req, res) => {
    const { username } = req.session;
    res.send(`Welcome back, ${username}`)
})

app.listen(3000, () => {
    console.log('listening on port 3000')
})
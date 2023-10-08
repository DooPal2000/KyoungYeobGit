
const express = require("express");
const app = express();

// app.use((req, res)=> {
//     console.log("경엽님의 첫 request");
//     res.send('<h1>This is KyoungYeob Webpage! </h1>')    
// })

app.get('/',(req,res)=> {
    res.send(`This is 경엽's home page`)
})

app.get('/r/:subreddit',(req,res)=> {
    const {subreddit} = req.params;
    console.log(req.params)
    res.send(`<h1>이 페이지는 레딧의 하위 페이지, ${subreddit} 페이지입니다.</h1><br> 경엽으로부터 제작됨`)
})
app.get('/r/:subreddit/:postId',(req,res)=> {
    const {subreddit,postId} = req.params;
    console.log(req.params)
    res.send(`<h1>For viewing postID, ${postId} 유저의 페이지: (${subreddit}) 입니다.</h1>`)
})


app.get('/cats',(req,res)=> {
    console.log("Cat Request")
    res.send('야옹야옹!')
})


app.get('/dogs',(req,res)=> {
    console.log("DOG Request")
    res.send('멍멍!')
})


app.post('/dogs',(req,res)=> {
    res.send('post 요청 - 멍멍!')
})

app.get('/search',(req,res)=> {
    const {q, color} = req.query;
    res.send(`<h1>검색 결과: ${q} , 색깔: ${color} 입니다.</h1>`)
})


app.get('*',(req,res)=> {
    res.send(`I don't know that path`)
})





app.listen(3000,()=> {
    console.log("Listening on port 3000")
})
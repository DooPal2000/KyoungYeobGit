
const express = require("express");
const axios = require('axios');

const app = express();
const path = require('path');
const redditData = require('./data.json');


app.use(express.static(path.join(__dirname, 'public')))


app.set('view engine', 'ejs');

// 현재 디렉토리를 가져와서 뒤에 /views 붙인 경로를 세팅해준다. 
app.set('views', path.join(__dirname, '/views'))

// app.get('/',(req,res)=>{
//     res.send('hi')
// })


function formatDate(date) {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}${month}${day}`;
}

function getClosestWeekdayInPast() {
    const currentDate = new Date();
    const currentDayOfWeek = currentDate.getDay();
    
    if (currentDayOfWeek >= 1 && currentDayOfWeek <= 6) {
      // 현재가 평일 or 토요일 경우 1일 전 날짜로 이동
      currentDate.setDate(currentDate.getDate() - 2);
    } else { // 일요일일 경우 2일 전 날짜로 이동
      currentDate.setDate(currentDate.getDate() - 3);
      
    }
    
    return currentDate;
}
  
const closestWeekdayInPast = getClosestWeekdayInPast();
const formattedDate = formatDate(closestWeekdayInPast);
  

app.get('/',(req,res)=>{
    res.render('home')
})

app.get('/bond', async (req, res) => {
    try {  

        // API 엔드포인트 URL 생성
        const apiUrl = `https://apis.data.go.kr/1160100/service/GetBondSecuritiesInfoService/getBondPriceInfo?serviceKey=N463weCrbTq%2B2DCYktfFErwgTb1paASqucp3BYeBsoWwFKSF51ikUg%2BJ1fIptkYqIjhkPqPx6vXLp%2FAZeELfCA%3D%3D&pageNo=1&numOfRows=30&resultType=json&beginBasDt=${formattedDate}&beginClprBnfRt=6&endClprBnfRt=12&beginTrPrc=100000000`;

        // API를 호출하고 데이터를 가져오는 작업
        const response = await axios.get(apiUrl);
        const bondData = response.data.response.body.items.item;
        console.log(bondData);


        // 가져온 데이터를 템플릿에 전달
        res.render('bond', { bondData });
    } catch (error) {
        // 오류 처리
        console.error('API 요청 중 오류가 발생했습니다.', error);
        res.status(500).send('API 요청 중 오류가 발생했습니다.');
    }
});
    




app.get('/cats',(req,res)=>{
    const cats = [
        'Blue', 'Rocket', 'Monty', 'Stephanie', 'Winston'
    ]
    res.render('cats', {cats})
})




app.get('/r/:subreddit',(req,res)=>{
    const { subreddit } = req.params;
    const data = redditData[subreddit];
    if(data){
        res.render('subreddit', { ...data })
    }else{
        res.render('notfound', {subreddit})
    }
    console.log(data);
})

app.get('/rand', (req, res) => {
    const num = Math.floor(Math.random() * 10) + 1;
    res.render('random', { num })
})



app.listen(3000,()=> {
    console.log("Listening on port 3000")
})
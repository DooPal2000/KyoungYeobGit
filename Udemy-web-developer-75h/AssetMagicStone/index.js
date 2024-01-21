const express = require("express");
const ejs = require('ejs');
const axios = require('axios');

const bondApiKey = 'N463weCrbTq%2B2DCYktfFErwgTb1paASqucp3BYeBsoWwFKSF51ikUg%2BJ1fIptkYqIjhkPqPx6vXLp%2FAZeELfCA%3D%3D'
const encodedApiKey = encodeURIComponent(bondApiKey);

const { getBondData, getKrwCurrencyData, getJpyCurrencyData } = require('./api');



const app = express();
const path = require('path')

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

// EJS 템플릿 파일을 렌더링하는 라우트
app.get('/bond', async (req, res) => {
    try {
        // 어제의 날짜를 계산
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const formattedDate = formatDate(yesterday);
  
        const bondData = await getBondData(formattedDate, apiKey);
        console.log(bondData);

        // 가져온 데이터를 템플릿에 전달
        res.render('bond', { bondData });
    } catch (error) {
        // 오류 처리
        console.error('API 요청 중 오류가 발생했습니다.', error);
        res.status(500).send('API 요청 중 오류가 발생했습니다.');
    }
});

app.get('/currency/krw', async(req,res) => {
  try{
    const currencyData = await getKrwCurrencyData();
    console.log(currencyData);

    res.render('currency/currencyKrw', { currencyData });
  }
  catch(err){
    console.error('API 요청 중 오류가 발생했습니다.', err);
    res.status(500).send('API 요청 중 오류가 발생했습니다.');
  }
});

app.get('/currency/jpy', async(req,res) => {
  try{
    const currencyData = await getJpyCurrencyData();
    console.log(currencyData);

    res.render('currency/currencyJpy', { currencyData });
  }
  catch(err){
    console.error('API 요청 중 오류가 발생했습니다.', err);
    res.status(500).send('API 요청 중 오류가 발생했습니다.');
  }
});
    





app.listen(3000,()=> {
  console.log("Listening on port 3000")
})
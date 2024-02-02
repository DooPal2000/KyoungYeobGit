const express = require('express');
const app = express();

// cookie-parser 설치 필요

const cookieParser = require('cookie-parser');

app.use(cookieParser('thisismysecret'));

// 제공된 코드에서 'thisismysecret'은 쿠키를 서명할 때 사용되는 비밀 키입니다. res.cookie에 { signed: true } 옵션을 사용하면 해당 쿠키에 서명이 추가됩니다.

// 쿠키 서명은 비밀 키를 사용하여 디지털 서명을 쿠키 데이터에 추가하는 것을 의미합니다. 
// 나중에 서버에서 쿠키를 받을 때 해당 서명을 사용하여 쿠키의 무결성을 확인합니다.
// 쿠키 데이터가 변경되거나 조작된 경우 서명이 일치하지 않아 쿠키가 유효하지 않다고 간주됩니다.

// 이 경우 'thisismysecret'은 쿠키를 서명하기 위한 
// 비밀 키로 작용하여 쿠키의 무결성과 신뢰성을 보장합니다.
// 이 비밀 키는 비밀로 유지해야 하며 누군가가 액세스하면 유효한 서명된 쿠키를
// 생성하거나 서명된 쿠키 데이터를 조작할 수 있습니다. 따라서 이 비밀 키는 보안적으로 중요합니다.

// 비밀 키를 변경하려면 코드에서 app.use(cookieParser('thisismysecret')); 
// 부분을 새로운 비밀 키로 업데이트해야 합니다. 그러나 주의해야 할 점은 이 변경이 발생하면 기존에 서명된 쿠키는 새로운 비밀 키로는 유효하지 않게 됩니다. 따라서 새로운 비밀 키로 변경할 때는 기존에 서명된 쿠키를 유효성 검사할 수 없게 됩니다.

app.get('/greet', (req, res) => {
    const { name = 'No-name', animal } = req.cookies;

    res.send(`Hey there, ${name}, Do you know ${animal}?`)
})

app.get('/setname', (req, res) => {
    res.cookie('name', 'henrietta');
    res.cookie('animal', 'harlequin shrimp')
    res.send('OK SENT YOU A COOKIE!!!')
})

// 사인된 쿠키는 밀랍으로 밀봉된 것과 유사하다고 보면 됩니다.
// 하지만 그렇다고 암호화(비밀) 안 보이게 하는 행위는 아닙니다.
// 아무도 건드리지 않았고, 손상되지 않았음만 확인하는 과정입니다.
// 만약 지정된 fruit 를 grape -> apple 로 바꾸게 된다면 손상되었다고 판단, 출력이 되지 않습니다

app.get('/getsignedcookie', (req, res) => {
    res.cookie('fruit', 'grape', { signed: true })
    res.send('OK SIGNED YOUR FRUIT COOKIE!')
})


// 만약 클라이언트에서 fruit 를 grape -> apple 로 바꾸게 된다면 손상되었다고 판단, 출력이 되지 않습니다
app.get('/verifyfruit', (req, res) => {
    console.log(req.cookies)
    console.log(req.signedCookies)
    res.send(req.signedCookies)
})

app.listen(3000, () => {
    console.log("SERVING!")
})
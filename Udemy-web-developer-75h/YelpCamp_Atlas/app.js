const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const session = require('express-session');
const flash = require('connect-flash');
const ExpressError = require('./utils/ExpressError');
const methodOverride = require('method-override');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/user.js');

const userRoutes= require('./routes/user.js');
const campgroundRoutes = require('./routes/camgprounds.js');
const reviewRoutes = require('./routes/reviews.js');


require('dotenv').config({ path: './process.env' });


mongoose
.connect(
  process.env.MONGODB_URI
)
.then(() => {
  console.log("Connected to database!");
})
.catch((e) => {
  console.log("Connection failed!");
  console.error("Connection failed:", e);
});



const app = express();

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

const sessionConfig = {
  secret: 'thisissecretkey', // 실제 프로덕트에서는 비밀 키
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true, //보안 코드 (디폴트 true)
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7, // 만료 기한은 설정해야함
    maxAge: 1000 * 60 * 60 * 24 * 7
  }
}

app.use(session(sessionConfig));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());




app.use((req,res,next)=>{
  res.locals.success = req.flash('success');
  res.locals.error  = req.flash('error');
  next();
})

app.get('/fakeUser', async(req,res) => {
  const user = new User({ email:'duq25@naver.com', username: 'yeob' })
  const newUser = await User.register(user, 'chicken');
  res.send(newUser);
  
})


app.use('/',userRoutes);
app.use('/campgrounds',campgroundRoutes);
app.use('/campgrounds/:id/reviews',reviewRoutes);


app.get('/', (req, res) => {
  res.render('home')
});



app.all('*', (req, res, next) => {
    next(new ExpressError('Page Not Found', 404))
})

app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) err.message = 'Oh No, Something Went Wrong!'
    res.status(statusCode).render('error', { err })
})


app.listen(3000, () => {
  console.log('Serving on port 3000')
})
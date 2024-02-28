const express = require('express');
const router = express.Router({mergeParams: true});
const User = require('../models/user');
const catchAsync = require('../utils/catchAsync');

router.get('/register', (req,res) => {
    res.render('users/register')
});

router.post('/register', catchAsync(async(req,res) => {
    try{
        const { email, username, password } = req.body;
        //await User.deleteMany({ username: username });
    
        const user = new User({email,username});
        const registerUser = await User.register(user,password);
        req.flash('success', 'Welcome to YelpCamp!');
        res.redirect('/campgrounds');
    
    } catch(e) {
        req.flash('error', e.message);
        res.redirect('register');
    }
    console.log(registerUser);
}));


module.exports = router;
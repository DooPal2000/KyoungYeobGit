const express = require('express');
const router = express.Router();

//라우터에서 미들웨어 적용하는 방법 
router.use((req, res, next) => {
    if (req.query.isAdmin) {
        return next();
    }
    return res.send("SORRY NOT AN ADMIN!")
})

router.get('/topsecret', (req, res) => {
    res.send('THIS IS TOP SECRET')
})
router.get('/deleteeverything', (req, res) => {
    res.send('OK DELETED IT ALL!')
})

module.exports = router;

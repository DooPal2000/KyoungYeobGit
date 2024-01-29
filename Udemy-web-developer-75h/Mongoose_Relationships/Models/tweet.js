const mongoose = require('mongoose');
const { Schema } = mongoose;

// ONE TO BAJILLIONS (트위터의 경우, 한 사용자당 많게는 몇만개까지 연결되어 있음)

// ⚠️ 즉, 농장-상품 관계(One to Many)에선 농장(One 측)에서 ref push 를 하지만,
// ⚠️ 사용자 - 트위터 관계(One to Bajillions) 에서는 트위터(many 측) 에 ref push한다. 

mongoose.connect('mongodb://localhost:27017/relationshipDemo', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("MONGO CONNECTION OPEN!!!")
    })
    .catch(err => {
        console.log("OH NO MONGO CONNECTION ERROR!!!!")
        console.log(err)
    })

const userSchema = new Schema({
    username: String,
    age: Number
})

const tweetSchema = new Schema({
    text: String,
    likes: Number,
    user: { type: Schema.Types.ObjectId, ref: 'User' }
})

const User = mongoose.model('User', userSchema);
const Tweet = mongoose.model('Tweet', tweetSchema);

// const makeTweets = async () => {
//     // const user = new User({ username: 'chickenfan99', age: 61 });
//     const user = await User.findOne({ username: 'chickenfan99' })
//     const tweet2 = new Tweet({ text: 'bock bock bock my chickens make noises', likes: 1239 });
//     tweet2.user = user;
//     tweet2.save();
// }

// makeTweets();


// 하단에서 mongoose findOne과 find 헷갈려서 잠시 헤맴
const findTweet = async () => {
    const t = await Tweet.find({}).populate('user')
    console.log(t);
}

findTweet();
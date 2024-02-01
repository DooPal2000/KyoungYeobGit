const mongoose = require('mongoose');
const Product = require('./product');
const { Schema } = mongoose;

// 우리가 식료품 웹사이트를 만든다고 하면, 농장에 따라 상품을 보여주는 것이 아닌
// 모든 상품을 펼쳐 놓아야 한다. products, farms 둘 다 ref => 쌍방 관계를 설명하였다.

const farmSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Farm must have a name!']
    },
    city: {
        type: String
    },
    email: {
        type: String,
        required: [true, 'Email required']
    },
    products: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Product'
        }
    ]
});

// DELETE ALL ASSOCIATED PRODUCTS AFTER A FARM IS DELETED
// 농장 삭제 시 하위에 있는 상품들도 같이 삭제하는 미들웨어
farmSchema.post('findOneAndDelete', async function (farm) {
    if (farm.products.length) {
        const res = await Product.deleteMany({ _id: { $in: farm.products } })
        console.log(res);
    }
})

const Farm = mongoose.model('Farm', farmSchema);



module.exports = Farm;
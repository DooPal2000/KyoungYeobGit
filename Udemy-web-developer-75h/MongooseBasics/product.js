const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/test');

const Cat = mongoose.model('Cat', { name: String });

const kitty = new Cat({ name: 'Zildjian' });
kitty.save().then(() => console.log('meow'));


const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 20
    },
    price: {
        type: Number,
        required: true,
        min: [0, 'Price must be positive ya dodo!']
    },
    onSale : {
        type: Boolean,
        default : false
    },
    categories : [String],
    qty : {
        online : {
            type: Number,
            default : 0
        },
        inStore : {
            type: Number,
            default : 0
        }
    },
    size: {
        type: String,
        enum: ['S', 'M', 'L']
    }

});


// productSchema.methods.greet = function() {
//     console.log("Hello! hi! this is kyoungYeob")
//     console.log(`- from ${this.name}`)
// }

productSchema.methods.toggleOnSale = function () {
    this.onSale = !this.onSale;
    return this.save();
}

productSchema.methods.addCategory = function (newCat) {
    this.categories.push(newCat);
    return this.save();
}

productSchema.statics.fireSale = function(){
    return this.updateMany({},{onSale: true, price: 0})
}

const Product = mongoose.model('Product', productSchema);

 
const findProduct = async () => {
    const foundProduct = await Product.findOne({name:'Bike Helmet'});
    console.log(foundProduct)
    await foundProduct.toggleOnSale();
    console.log(foundProduct)
    await foundProduct.addCategory('Outdoors')
    console.log(foundProduct)
}
Product.fireSale().then(res => console.log(res))

// findProduct();
// const amadeus = new Movie({title:'Amadeus', year:'1986', score:9.2, rating:'R'})
 
// const bike = new Product({name: 'Mountain Bike', price : 599 })
// const bike = new Product({name: 'Cycleing Jersey', price : 28.5, categories: ['Cycling'], size: 'xs' })
// bike.save()
//     .then(data => {
//         console.log('It Worked!');
//         console.log(data);
//     })
//     .catch(err => {
//         console.log("Oh No Error!");
//         console.log(err);        
//     })


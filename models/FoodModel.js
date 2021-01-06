const mongoose = require("mongoose");

/**
 * @author Aakash Jangid
 * @collection foodlist
 * @fields 
 */
const FoodListSchema = new mongoose.Schema({


    "category": {
        "type": "String"
    },
    "itemName": {
        "type": "String"
    },
    "price": {
       type : Object
    },
    "discount": {
        "type": "Number"
    },
    "image": {
        "type": "String"
    }


});


module.exports = mongoose.model('Foodlist', FoodListSchema);
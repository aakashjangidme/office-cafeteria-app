/**
 * @author Aakash Jangid
 * @desc Food list api
 */

const FoodModel = require("../models/FoodModel");



exports.foodList = async (_, res, __) => {
    try {

        const foodList = await FoodModel.find();
        console.log(foodList)

        let data = {}

        data = {
            "data": foodList
        }
        return res.status(200).json(data);
    }
    catch (err) {
        return res.status(200).json({
            "error": err.message
            // "error": process.env.ERROR_STRING
        })
    }

}

/**
 * Add Food in the chart - for admin only
 */

exports.addFood = async (req, res, _) => {

    try {

        let food = new FoodModel(req.body);
        let kFood = await food.save()

        // If succesful, send this Json with a status of 200 i.e success
        // along with the registration Id.
        const data = {
            "status": 200,
            "_id": kFood._id
        }
        res.status(200).json(data);

    }
    catch (err) {
        console.error(err.message)
        // If the post request fails, then send a status of 400 denoting the failure
        // along with the error message
        // these error messages can further be customised with [Custom Exception Classes]
        const data = {
            "status": 400,
            "error": err.message
        }
        res.status(400).json(data);

    }
}




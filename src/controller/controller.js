const Boom = require('boom');
const client = require('../grpc/client')

module.exports.users = async function (request, h) {
    try {
        const db = request.mongo.db;
        return await db.collection('users').find({}).toArray();
    } catch (err) {
        console.log(err)
        throw Boom.internal(err);
    }
};

module.exports.products = async function (request, h) {
    try {
        const db = request.mongo.db;
        const userID = request.headers['x-user-id']
        const products = await db.collection('products').find({}).toArray()
        const response = products.map(item => {
            return {
                id: item._id,
                title: item.title,
                description: item.description,
                price_in_cents: item.priceincents,
                discount: {
                    percentage: 0,
                    value_in_cents: 0
                }
            }
        });

        if (userID) {
            await exec(userID, response)
        }

        return response
    } catch (err) {
        console.log(err)
        throw Boom.internal(err);
    }
};

async function calculator(userID, productID) {
    return new Promise((resolve, reject) => {
        var timeout = new Date().setSeconds(new Date().getSeconds() + 1)
        client.calculator({user_id: userID, product_id: productID}, {deadline: timeout}, (error, calculator) => {
            if (!error) {
                resolve(calculator)
            } else {
                reject(error);
            }
        });
    });
}

async function exec(userID, response) {
    try {
        const calculators = await Promise.all(response.map(item => calculator(userID, item.id)))
        for (const item of response) {
            const calculator = calculators.find(calculator => calculator.id === item.id)
            if (calculator) {
                item.discount.percentage = calculator.discount.percentage
                item.discount.value_in_cents = calculator.discount.value_in_cents
            }
        }
    } catch (e) {
        console.log(e.message)
    }
}
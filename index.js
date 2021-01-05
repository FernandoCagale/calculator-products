const Hapi = require('@hapi/hapi');
const Joi = require('joi');

require('dotenv').config();

const controller = require('./src/controller/controller')

const init = async () => {

    const server = Hapi.server({
        port: process.env.PORT
    });

    await server.register({
        plugin: require('hapi-mongodb'),
        options: {
            url: process.env.MONGO_ADDRS,
            settings: {
                poolSize: 10,
                useUnifiedTopology: true
            },
            decorate: true
        }
    });

    server.route({
        method: 'GET',
        path: '/users',
        handler: controller.users
    });

    server.route({
        method: 'GET',
        path: '/product',
        handler: controller.products,
        options: {
            validate: {
                headers: Joi.object({
                    'x-user-id': Joi.string().optional()
                }),
                options: {
                    allowUnknown: true
                }
            }
        }
    });

    await server.start();
    console.log('Server running on %s', server.info.uri);
};



process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();
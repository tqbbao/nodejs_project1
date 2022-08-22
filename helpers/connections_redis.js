// const redis = require('redis');

// const client = redis.createClient({
//     port: 6379,
//     host: '127.0.0.1'
// });
// client.connect();

// client.ping( (err, pong) => {
//     console.log(pong);
// });

// client.on("error", function(error) {
//     console.error(error);
// });

// client.on("connect",function(error) {
//     console.log('Connected redis');
// });

// client.on("ready", function(error) {
//     console.log('Redis to ready');
// });
// client.connect().then();
// module.exports = {
//     client
// };

const redis = require('redis');

async function createRedisClient () {
    const client = redis.createClient({
        port: 6379,
        host: '127.0.0.1'
    });

    client.on('connect', () => {console.log(`REDIS::: connected:::`)});
    client.on('error', (err) => console.log('Error connecting to REDIS: ', err));
    client.on('ready', () => console.log('REDIS::: redis to ready:::'));
    client.on('end', () => console.log('REDIS::: disconnected:::'));
    
    await client.connect(); 
   
    process.on('SIGINT', async () => {
        console.log('REDIS::: disconnected:::');
        await client.quit();
    });
    return client;

}

module.exports = createRedisClient();
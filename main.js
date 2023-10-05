const redisClient = require('./utils/redis');

(async () => {
    // console.log(redisClient.client);
    console.log(redisClient.isAlive(), 'one');
    console.log(await redisClient.get('myKey'), 'two');
    await redisClient.set('myKey', 12, 5);
    console.log(await redisClient.get('myKey'), 'three');

    setTimeout(async () => {
        console.log(await redisClient.get('myKey'), 'four');
    }, 1000*10)
})();

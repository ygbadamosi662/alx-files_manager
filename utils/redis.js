const redis = require('redis');

class RedisClient {
  constructor() {
    this._client = redis.createClient();
    // console.log('Client', this._client)
    // createClient()
    //   .connect()
    //   .then((result) => {
    //     this._client = result;
    //     console.log('Redis connected');
    //   })
    //   .catch((err) => {
    //     console.log('Redis error', err)
    //   });
  }

  isAlive() {
    // console.log(this._client)
    const pong = this._client.PING();
    return pong === 'PONG';
  }

  get client() {
    return this._client;
  }

  async get(key) {
    if (!key) { return }
    try {
      return await this._client.get(key);
    } catch (error) {
      throw error;
    }
  }

  async set(key, value, duration) {
    if (!key || !value || ! duration) { return }
    try {
      await this._client.SETEX(key, duration, value);
    } catch (error) {
      console.log(error);
    }
  }

  async del(key) {
    if (!key) { return }
    try {
      await this._client.DEL(key);
    } catch (error) {
      console.log(error);
    }
  }
}
(async () => {
  try {
    let client = await redis.createClient({
      host: 'localhost',
      port: 6379,
    });
  
    client.on('connection', () => {
      console.log('Connected to Redis server');
    });

    client.on('error', (err) => {
      console.log('Redis Error', err);
    });
  } catch (err) {
    console.log('Redis connection error', err);
  }
})();
const redisClient = new RedisClient();

module.exports = redisClient;

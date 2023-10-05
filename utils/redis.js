const redis = require('redis');


class RedisClient {
  constructor() {
    this._client = redis.createClient();
    console.log('Connecting.....');
  
    this._client.on('error', (err) => {
      console.log('Redis error: ', err);
    });
    this._client.on('connect', () => {
      console.log('Redis connected', 'connected:', this._client.connected, ' ready:', this._client.ready);
    })
  }

  isAlive() {
    let okk = null;
    this._client.ping((err, reply) => {
      console.log(typeof reply, reply)
      console.log(typeof 'PONG', 'PONG')
       if (reply === 'PONG') {
        console.log('yea')
        okk = true;
       } else {
        okk = false;
       }
    });

    return okk;
  }

  get client() {
    return this._client;
  }

  get connectionPromise() {
    return this._connectionPromise;
  }

  async get(key) {
    if (!key) { return }
    try {
      let riri = ''
      this._client.get(key, (err, reply) => {
        riri = reply;
      });
      return riri;
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

const redisClient = new RedisClient();

module.exports = redisClient;

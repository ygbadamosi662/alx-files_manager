import redis from 'redis';
import { promisify } from 'util';

<<<<<<< HEAD

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
=======
/**
 * Class for performing operations with Redis service
 */
class RedisClient {
  constructor() {
    this.client = redis.createClient();
    this.getAsync = promisify(this.client.get).bind(this.client);

    this.client.on('error', (error) => {
      console.log(`Redis client not connected to the server: ${error.message}`);
    });

    this.client.on('connect', () => {
      // console.log('Redis client connected to the server');
    });
>>>>>>> 0fe8d4af6f9ca12df73540aa6cd8456614e9556e
  }

  /**
   * Checks if connection to Redis is Alive
   * @return {boolean} true if connection alive or false if not
   */
  isAlive() {
<<<<<<< HEAD
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
=======
    return this.client.connected;
  }

  /**
   * gets value corresponding to key in redis
   * @key {string} key to search for in redis
   * @return {string}  value of key
   */
  async get(key) {
    const value = await this.getAsync(key);
    return value;
>>>>>>> 0fe8d4af6f9ca12df73540aa6cd8456614e9556e
  }

  /**
   * Creates a new key in redis with a specific TTL
   * @key {string} key to be saved in redis
   * @value {string} value to be asigned to key
   * @duration {number} TTL of key
   * @return {undefined}  No return
   */
  async set(key, value, duration) {
    this.client.setex(key, duration, value);
  }

  /**
   * Deletes key in redis service
   * @key {string} key to be deleted
   * @return {undefined}  No return
   */
  async del(key) {
    this.client.del(key);
  }
}

const redisClient = new RedisClient();

export default redisClient;

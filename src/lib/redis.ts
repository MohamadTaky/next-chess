import { Redis } from "@upstash/redis";

const globalRedis = globalThis as unknown as {
  redis: Redis;
};

const redis =
  globalRedis.redis ??
  new Redis({
    url: process.env.REDIS_REST_URL!,
    token: process.env.REDIS_REST_TOKEN!,
  });

if (process.env.NODE_ENV !== "production") {
  globalRedis.redis = redis;
}

export default redis;

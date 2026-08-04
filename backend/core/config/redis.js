import { createClient, SCHEMA_FIELD_TYPE } from "redis";

export const client = await createClient({
  url: `redis://${process.env.REDIS_HOST || 'localhost'}:6379`
})
  .on("error", (err) => console.log("Redis Client Error", err))
  .connect();
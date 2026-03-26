import { createClient, SCHEMA_FIELD_TYPE } from "redis";

export const client = await createClient({
  url: `redis://${process.env.REDIS_HOST || 'localhost'}:6379`
})
  .on("error", (err) => console.log("Redis Client Error", err))
  .connect();

await client.ft.dropIndex('idx:supplies').then(() => {}, () => {});
await client.ft.dropIndex('idx:supplies_review').then(() => {}, () => {});

await client.ft.create('idx:supplies', {
  '$.donorId': {
    type: SCHEMA_FIELD_TYPE.NUMERIC,
    AS: 'donorId'
  }
}, {
  ON: 'JSON',
  PREFIX: ['supply:']
});

await client.ft.create('idx:supplies_review', {
  '$.reviewerId': {
    type: SCHEMA_FIELD_TYPE.NUMERIC,
    AS: 'reviewerId'
  },
  '$.donorId': {
    type: SCHEMA_FIELD_TYPE.NUMERIC,
    AS: 'donorId'
  }
}, {
  ON: 'JSON',
  PREFIX: ['supply_review:']
});
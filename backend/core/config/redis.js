import { createClient, SCHEMA_FIELD_TYPE } from "redis";

export const client = await createClient({
  url: `redis://${process.env.REDIS_HOST || 'localhost'}:6379`
})
  .on("error", (err) => console.log("Redis Client Error", err))
  .connect();

await client.ft.dropIndex('idx:supplies').then(() => {}, () => {});
await client.ft.dropIndex('idx:supplies_audited').then(() => {}, () => {});

await client.ft.create('idx:supplies', {
  '$.id': {
    type: SCHEMA_FIELD_TYPE.TEXT,
    AS: 'id'
  },
  '$.userId': {
    type: SCHEMA_FIELD_TYPE.NUMERIC,
    AS: 'userId'
  }
}, {
  ON: 'JSON',
  PREFIX: ['supply:']
});

await client.ft.create('idx:supplies_audited', {
  '$.id': {
    type: SCHEMA_FIELD_TYPE.TEXT,
    AS: 'id'
  },
  '$.reviewerId': {
    type: SCHEMA_FIELD_TYPE.NUMERIC,
    AS: 'reviewerId'
  },
  '$.userId': {
    type: SCHEMA_FIELD_TYPE.NUMERIC,
    AS: 'userId'
  }
}, {
  ON: 'JSON',
  PREFIX: ['supply_audited:']
});
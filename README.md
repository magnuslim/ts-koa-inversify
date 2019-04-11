# ts-koa-inversify
a toy project using koa along with inversify

# usage

First, update `server/inversify.config.ts` to config Spanner correctly, then run:

```bash
yarn start
```

Make a request:

```bash
curl 'http://localhost:3000/users/12345' -H 'X-Request-Id: abcddddd'
```
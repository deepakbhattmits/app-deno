<!-- @format -->

# Deno REST API

> This is a simple REST API using Deno and Oak and connected MongoDB. It is part of Deno course.

## Run

```
deno run --allow-net --allow-read --allow-write --allow-plugin --unstable server.ts
```

## Routes

```
GET      /api/v1/activities
GET      /api/v1/activities/:id
POST     /api/v1/activities
PUT      /api/v1/activities/:id
DELETE   /api/v1/activities/:id
```

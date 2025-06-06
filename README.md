# NestJS on Vercel

This is a small example of a NestJS service configured for Vercel deployment. It follows a simple 3 layer structure (Controller → Service → Repository) and demonstrates how to use a common interceptor with a single custom decorator.

## Install

```bash
npm install
```

## Development

```bash
npm run start:dev
```

## Build

```bash
npm run build
```

## Deploy to Vercel

With `vercel.json` included you can deploy using the Vercel CLI.

```bash
vercel --prod
```

## Structure

- `AppController` calls `AppService`, which in turn calls `AppRepository`.
- The `Custom` decorator sets `CustomProperty` metadata that `LoggingInterceptor` reads.
- `AppRepository` uses an in-memory `Map` as a local cache.

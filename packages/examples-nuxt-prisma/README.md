# examples-nuxt-prisma

Nuxt 4 application with Prisma and PostgreSQL.

## Purpose

Try data access from Nuxt 4 server API routes (`server/api`) with Prisma 7 and PostgreSQL,
including migrations and seeding.

## Stack

- Nuxt 4 / Vue 3
- Prisma 7 (`prisma-client` generator) / PostgreSQL
- Pinia

## Getting started

Requires a running PostgreSQL. Run from the repository root:

```sh
cp packages/examples-nuxt-prisma/.env.example packages/examples-nuxt-prisma/.env  # then edit DATABASE_URL
pnpm install
pnpm --filter examples-nuxt-prisma prisma:generate
pnpm --filter examples-nuxt-prisma exec prisma migrate deploy
pnpm --filter examples-nuxt-prisma prisma:seed
pnpm --filter examples-nuxt-prisma dev
```

## Notes

- Environment variables: `DATABASE_URL` (and optionally `SHADOW_DATABASE_URL` for `prisma migrate dev`), loaded by `prisma7.config.ts`.
- ESLint setup: see [@examples/eslint-config](../eslint-config/README.md).

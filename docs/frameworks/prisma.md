# Prisma ORM

Prisma is an open-source ORM (Object-Relational Mapping) tool that simplifies database access and management
for Node.js and TypeScript applications.

> [!NOTE]
> It looks like v8 is the latest version, but when I followed the instructions,
> I was told to install `bun`—even though this is a Node container.
>
> Also, since it appeared to still be a release candidate (RC), I’ll be learning v7 here instead.

## Installation

### Installation via Nuxt4

To install Prisma in a Nuxt4 project, you can use the following steps:

Create a new project using Nuxt:

```bash
pnpm create nuxt@latest examples-nuxt-prisma
cd examples-nuxt-prisma
```

Install required dependencies:

```bash
pnpm add prisma@prev @types/pg --save-dev
pnpm add @prisma/client@7 @prisma/adapter-pg pg dotenv
```

Configure ESM support, by adding the following to your `nuxt.config.ts`:

```ts
export default defineNuxtConfig({
  typescript: {
    tsConfig: {
      compilerOptions: {
        module: 'ESNext',
        moduleResolution: 'bundler',
        target: 'ES2023',
        strict: true,
        esModuleInterop: true,
        ignoreDeprecations: '6.0',
      },
    },
  },
})
```

Check ESM support in `package.json`:

```json
{
  "type": "module"
}
```

### Initialize Prisma ORM

Next, set up your Prisma ORM project by creating your Prisma Schema file with the following command:

```bash
pnpm prisma init --output ../server/prisma
```

If the automatically activated agent skills are getting in the way:

```bash
pnpm prisma init --output ../server/prisma --no-skills
```

> [!WARNING]
> In any case, even if you output it using pnpm-workspace, it won't be placed in the standard location.

## Quickstart

### Setup Database

```bash
pnpm dlx create-db@latest
```

Running the command outputs a connection string.

However, since I have already gone to the trouble of setting up a PostgreSQL container, I will use that instead.

```ini
#.env
DATABASE_URL="postgresql://user:password@localhost:5432/database"
```

Create a `schema.prisma` file in the `prisma` directory (e.g., `../server/prisma/schema.prisma`) and define your data model.

For example:

```prisma
generator client {
  provider = "prisma-client"
  output   = "../server/prisma"
}

datasource db {
  provider = "postgresql"
}


model User {
  id    Int     @id @default(autoincrement())
  email String  @unique
  name  String?
  posts Post[]
}

model Post {
  id        Int     @id @default(autoincrement())
  title     String
  content   String?
  published Boolean @default(false)
  author    User    @relation(fields: [authorId], references: [id])
  authorId  Int
}
```

### Create and apply your first migration

Create your first migration to set up the database tables:

```bash
pnpm prisma migrate dev --name init
```

This command creates the database tables based on your schema.

Now run the following command to generate the Prisma Client:

```bash
pnpm prisma generate
```

This command generates client code in `server/prisma`.

### Instantiate Prisma Client

Create the code for generating the Prisma Client (a factory?):

```ts
// server/lib/prisma.ts
import 'dotenv/config'
import { PrismaPg } from '@prisma/adapter-pg'

import { PrismaClient } from '../prisma/client'
const connectionString = `${process.env.DATABASE_URL}`
const adapter = new PrismaPg({ connectionString })
const prisma = new PrismaClient({ adapter })

export { prisma }
```

### Create Test script

Next is the script for verifying the connection:

```ts
// scripts/test-prisma.ts
import { prisma } from './lib/prisma'

async function main() {
  // Delete all existing users and posts to start fresh
  await prisma.post.deleteMany()
  await prisma.user.deleteMany()

  // Create a new user with a post
  const user = await prisma.user.create({
    data: {
      name: 'Alice',
      email: 'alice@prisma.io',
      posts: {
        create: {
          title: 'Hello World',
          content: 'This is my first post!',
          published: true,
        },
      },
    },
    include: {
      posts: true,
    },
  })
  console.log('Created user:', user)

  // Fetch all users with their posts
  const allUsers = await prisma.user.findMany({
    include: {
      posts: true,
    },
  })
  console.log('All users:', JSON.stringify(allUsers, null, 2))
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
```

Run the script:

```bash
pnpm dlx tsx scripts/test-prisma.ts
```

## Explore your data with Prisma Studio

Prisma Studio is a visual editor for your database. Launch it with:

```bash
pnpm prisma studio
```

This launches a web application.

## VS Code Integration

Use the Prisma extension in VS Code to get the best development experience.

- [Prisma VS Code Extension](https://marketplace.visualstudio.com/items?itemName=Prisma.prisma)

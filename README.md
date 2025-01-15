# coffeemug

## Installation
It's recommended to use [Bun](https://bun.sh/) for handling dependencies, but any other package manager should work just fine.

To install dependencies:
```bash
bun install
```

To run migrations:

```bash
bun migrate
```

To run:

```bash
bun start
```

## Tech stack

- Express.js
- TypeScript
- Zod for validation and type-safety
- Drizzle as a type-safe ORM
- SQLite3 (LibSQL) as the database, but it can be easily changed to Postgres or MySQL.
- Dotenv for .env access (but it's not necessary for this project)

## Possible improvements

- Some sort of linter, like biome or eslint
- Authorizer for creating orders. Currently all users are of id 1
- If this project is supposed to be horizontally scaled, database should be changed to something more scalable, like MySQL. If even more performance is needed, DynamoDB would be a good bet, but that requires changing the database layer
- Better error handling - currently some errors are very technical, which could be not ideal for some cases.

This project was created using `bun init` in bun v1.1.42. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.

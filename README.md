<div align="center">

# 🌱 Taskling 🌱

Grow your projects one task at a time 🌻

</div>

✋ **Wait!** Thank you for your interest in our project, but our garden is still growing. Please check back soon to see Taskling in bloom 🪴

## Our Gardeners

- Angela Fisher ([@angelajfisher](https://github.com/angelajfisher))
- Benjamin Stults ([@BenjaminStults](https://github.com/BenjaminStults))
- Erika Linden ([@erika1ynn](https://github.com/erika1ynn))
- Silva Galstyan ([@silvaGee](https://github.com/silvaGee))

## Local Development

### Requirements

For a streamlined monorepo development environment, this project is configured to use `pnpm` and `Docker`. You can work without those dependencies, but the package scripts are not equipped to support that setup so YMMV.

- [Node](https://nodejs.org/en/download)
- [pnpm](https://pnpm.io/installation)
- [Docker](https://docs.docker.com/engine/install/)

### Getting Started

Run the following to set up your dev environment:
```sh
cp .vscode/settings.example.json .vscode/settings.json
cp .env.sample .env
rm -rf node_modules
rm -rf backend/node_modules
rm -rf frontend/node_modules
```

If your IDE of choice is VS Code, copy the contents of `.vscode/settings.example.json` into a new file called `.vscode/settings.json` and install the recommended extensions. This will get you started with Biome, but you have the freedom to alter your workspace settings from there.

Add the contents of `.env.sample` into your environment variable storage of choice, so long as it's accessible from the project's root. We recommend a `.env` file for local dev.

Once your dev environment is ready to go, simply run `pnpm dev` from the project root to begin!

### Working with Dependencies

Forget about `cd`, you can stay in the project root! `pnpm` uses the `--filter=<SERVICE>` flag to denote the intended space for a command to be run.

For example:

- Adding a package to the frontend: `pnpm add --filter=frontend react`
- Running the startup script for the backend: `pnpm --filter=backend start`

Of course, you can also always `cd` into your service of choice and run commands directly without the `filter` flag.

Note that when executing a command from a Docker container, the `filter` flag **must** be used.

### Database Migrations

We're using [`node-pg-migrate`](https://salsita.github.io/node-pg-migrate/) to manage our database migrations. If you need to create or alter migrations, refer to its documentation for use.

Some handy pnpm scripts are in place to make using this tool easier:

- `pnpm new-migration <YOUR MIGRATION NAME>` will create a new migration file in `backend/db/migrations`
- `pnpm --filter=backend migrate` is shorthand to use the tool pre-configured with our database settings
  - Only useful when executed from within the backend docker container

In general, you won't need to worry about making database migrations, as our project's launch script (`pnpm dev`) will automatically run them upon startup.

# syntax=docker/dockerfile:1.7-labs

# Set up pnpm in base image
FROM node:22-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable pnpm && corepack install -g pnpm@latest-10


# Init base image with cached dependencies
FROM base AS build
WORKDIR /app
# Copy only files specific to pnpm install, so that install is run only when these files change
COPY --exclude=**/node_modules --parents **/package.json .npmrc pnpm-workspace.yaml pnpm-lock.yaml /app/
# Preserve global pnpm cache across installs and run install
RUN --mount=type=cache,target=/root/.local/share/pnpm pnpm fetch


# Build image for frontend targets
FROM build AS frontend
WORKDIR /app
RUN pnpm install --offline --filter=frontend
EXPOSE 3000
CMD [ "pnpm", "run", "--filter=frontend", "dev" ]


# Build image for backend targets
FROM build AS backend
WORKDIR /app
RUN pnpm install --offline --filter=backend
EXPOSE 8000
CMD [ "pnpm", "run", "--filter=backend", "start" ]

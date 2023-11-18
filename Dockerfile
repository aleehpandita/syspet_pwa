# ---- Base Node ----
FROM node:15.14.0-alpine AS base
WORKDIR /app

# ---- Dependencies ----
FROM base AS build

COPY package*.json ./
COPY yarn.lock ./
RUN yarn install --frozen-lockfile

COPY ./ /app
RUN yarn run build

# --- Release ----
FROM base AS release  

COPY --from=build /app/server ./
COPY --from=build /app/dist ./

RUN yarn global add pm2 && \
    yarn add express compression connect-history-api-fallback helmet


CMD ["pm2-runtime", "/app/process.yml", "--json"]
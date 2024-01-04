# first time install dependencies
FROM node:18-alpine3.15 AS dependencies
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Build the app with cached dependencies
FROM node:18-alpine3.15 AS builder
WORKDIR /app
COPY --from=dependencies /app/node_modules ./node_modules
COPY . .
RUN yarn build

# Craete the production image, copy all the files and run next
FROM node:18-alpine3.15 AS runner
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN yarn install --prod
COPY --from=builder /app/dist ./dist


CMD [ "node","dist/main" ]
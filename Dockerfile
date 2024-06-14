# This is a custom dockerfile for Design System only. 
# Please don't use this in your projects. 

# If building locally, comment this build stage out.
# Build Stage
FROM node:18-alpine AS BUILD_IMAGE
WORKDIR /app
COPY package*.json ./
RUN npm config set fetch-retry-mintimeout 200000
RUN npm config set fetch-retry-maxtimeout 1200000
COPY . .
ENV NODE_ENV {{ env }}
RUN npm ci

# Production Stage
FROM node:18-alpine AS PRODUCTION_STAGE
WORKDIR /app
COPY ./storybook-static ./storybook-static
ENV NODE_ENV=production
ENV PORT 6006
# variable doesn't work here for some reason. Taken from env variable files, must match
EXPOSE 6006
CMD ["npx", "http-server", "./storybook-static"]

FROM node:18-alpine as build

WORKDIR /app

COPY package*.json ./

RUN npm install
# Bundle app source
COPY . .

RUN npx prisma generate

# Creates a "dist" folder with the production build
RUN npm run build

FROM node:18-alpine as main

WORKDIR /app

# Bundle app source
COPY --from=build /app/dist /app/dist
# COPY --from=build /app/environment /app/environment
COPY --from=build /app/node_modules /app/node_modules
COPY --from=build /app/prisma /app/prisma 
COPY --from=build /app/package.json /app/package.json

EXPOSE 3000

ENV NODE_ENV=production

CMD npm run migrate:prod;node dist/main.js

# When run, mount env file .production.env to /app/environment
# docker run -v .production.env:/app/environment ${project-name}:${version}
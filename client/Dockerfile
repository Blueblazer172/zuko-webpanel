# build stage
FROM node:lts-alpine as build-stage
WORKDIR /usr/share/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# production stage
FROM nginx:stable-alpine as production-stage
RUN mkdir /app
COPY --from=build-stage /usr/share/app/dist /app
COPY nginx.conf /etc/nginx/nginx.conf


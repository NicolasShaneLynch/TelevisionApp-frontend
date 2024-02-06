FROM node:alpine AS build
ARG ENV
WORKDIR /app
COPY package*.json ./
RUN npm install
RUN npm ci
COPY . .
RUN npm run build --prod

# stage 2

FROM nginx
ARG ENV
COPY --from=build /app/dist/frontend-contrader /usr/share/nginx/html
COPY /nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
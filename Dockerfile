FROM node:alpine AS build
ARG ENV
RUN mkdir /app
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN echo "DEBUG" && pwd && ls 
RUN npm run build

# stage 2

FROM nginx
ARG ENV
COPY --from=build /app/dist/frontend-contrader /usr/share/nginx/html
COPY /nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
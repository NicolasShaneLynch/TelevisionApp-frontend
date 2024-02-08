# Stage 1: Build Angular app
FROM registry.access.redhat.com/ubi8/nodejs-18:1-71.1695741533 as build-stage

# Change user to root temporarily
USER root

# Make project dir
RUN mkdir -p /project/dist \
    && chown -R 1001:1001 /project/dist

# Set the working directory to /project
WORKDIR /project

# Copy package files in container current directory
COPY --chown=1001:1001 package.json package-lock.json ./

# Install all Angular dependencies
RUN npm install

# Add application files in container 
COPY . .

# Run build script using npm command
RUN npm run build

# Stage 2: Serve Angular app with Nginx
FROM registry.access.redhat.com/ubi8/nginx-118

COPY --from=build-stage /project/dist/frontend-contrader /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

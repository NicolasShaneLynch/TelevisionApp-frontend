# Import the base image as UBI-Nodejs 18 image
FROM registry.access.redhat.com/ubi8/nodejs-18:1-71.1695741533

# Make project dir
RUN mkdir app

# Set the working directory to /project
WORKDIR /app

# Copy package files in container current directory
COPY --chown=1001:1001 package.json package-lock.json ./

# Install all Angular dependencies
RUN npm ci

# Add application files in container 
COPY . .

# Set permission of .angular file in container
VOLUME ["/app/.angular"]

# Open port to allow traffic in container
EXPOSE 80

# Run start script using npm command
CMD ["npm", "start"]

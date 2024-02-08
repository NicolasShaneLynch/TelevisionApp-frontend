# Import the base image as UBI-Nodejs 18 image
FROM registry.access.redhat.com/ubi8/nodejs-18:1-71.1695741533

#Change user
USER root

# Make project dir
RUN mkdir -p /project/dist \
    && chown -R 1001:1001 /project/dist

# Set the working directory to /project
WORKDIR /project

# Copy package files in container current directory
COPY --chown=1001:1001 package.json package-lock.json ./

# Install all Angular dependencies
RUN npm ci

# Add application files in container 
COPY . .

# Set permission of .angular file in container
VOLUME ["/project/.angular"]

# Open port to allow traffic in container
EXPOSE 80

# Set environment variable for Node.js memory limit
ENV NODE_OPTIONS="--max_old_space_size=8192"

# Run build script using npm command
CMD ["npm", "run", "build"]

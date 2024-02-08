# Import the base image as UBI-Nodejs 18 image
FROM registry.access.redhat.com/ubi8/nodejs-18:1-71.1695741533

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

# Set permission of .angular file in container
VOLUME ["/project/.angular"]

# Open port to allow traffic in container
EXPOSE 8080

# Set environment variable for Node.js memory limit
ENV NODE_OPTIONS="--max_old_space_size=8192"

# Change user back to non-root user
USER 1001

# Run the application using npm command
CMD ["npm", "start"]

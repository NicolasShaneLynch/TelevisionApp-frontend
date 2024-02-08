# Import the base image as UBI-Nodejs 18 image
FROM registry.access.redhat.com/ubi8/nodejs-18:1-71.1695741533

# Set User root
USER root

RUN ls

# Set the working directory to /app
WORKDIR /project

RUN ls

# Check user
RUN echo "WHOAMI" && whoami

# Copy package files in container current directory
COPY package.json package-lock.json ./

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

# Temporarily switch to root user to run npm start with escalated privileges

CMD npm start --loglevel=verbose

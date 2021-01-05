FROM node:12.13.0-alpine

# Create app directory
RUN mkdir -p /usr/src/app

# Default dir
WORKDIR /usr/src/app

# Copy package
COPY package*.json ./

# Install app dependencies
RUN npm install --silent

# Bundle app source
COPY . /usr/src/app

# Expose port
EXPOSE 3000

# Run app using nodemon
CMD ["node", "index.js"]
# Use official Node.js image
FROM node:18-alpine

# Set app directory
WORKDIR /usr/src/app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of your code
COPY . .

# Set environment variable for production
ENV NODE_ENV=production

# Expose backend port
EXPOSE 3000

# Start your app
CMD ["npm", "start"]

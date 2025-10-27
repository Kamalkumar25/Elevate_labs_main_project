# Use Node.js version 18
FROM node:18-alpine

# Set working directory inside container
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the app files
COPY . .

# Expose port 8080 so it can be accessed
EXPOSE 8080

# Start the app
CMD ["npm", "start"]
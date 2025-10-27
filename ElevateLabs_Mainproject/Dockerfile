# Use official Node.js image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json first
COPY package*.json ./

# Install only production dependencies
RUN npm install --production

# Copy everything (including the public folder)
COPY . .

# Expose the app port
EXPOSE 8080

# Start the app
CMD ["node", "app.js"]
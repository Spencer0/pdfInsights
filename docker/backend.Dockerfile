# Use Node.js official image as base
FROM node:14

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and install dependencies
COPY package.json .
RUN npm install

# Copy the rest of the backend code
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Command to run the application
CMD ["node", "src/server.js"]

# Use Node.js official image as base
FROM node:14

# Set the working directory
WORKDIR /usr/src/app

# Create directory structure
RUN mkdir -p packages/backend packages/common

# Copy common package first
COPY packages/common/. packages/common/

# Copy backend package
COPY packages/backend/. packages/backend/

# Set working directory to backend
WORKDIR /usr/src/app/packages/backend

# Install dependencies
RUN npm install

# Build the application
RUN npm run build

# Expose the port the app runs on
EXPOSE 3000

# Command to run the application
CMD ["node", "dist/backend/src/server.js"]
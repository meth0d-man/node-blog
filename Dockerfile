FROM node:latest

# Set working directory inside the container
WORKDIR /Users/vladimirilic/Projects/node-blog
# Copy package.json and package-lock.json to the working directory
COPY package*.json ./
# Install dependencies
RUN npm install
# Copy all app files to the working directory
COPY . .
# Expose the port your app runs on (if applicable)
EXPOSE 5000
# Command to run your application
CMD ["npx", "nodemon", "app.js"]
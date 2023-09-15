# # Use the official Node.js base image
# FROM node:14-alpine

# # Set the working directory in the container
# WORKDIR /app

# # Copy package.json and package-lock.json (if available) to the container
# COPY package*.json ./

# # Install app dependencies
# RUN npm install

# # Copy the rest of the app's code to the container
# COPY . .

# # Build the production version of the React app
# RUN npm run build

# # Expose the port your React app is running on (change to your app's port)
# EXPOSE 3000

# # Start the React app when the container starts
# CMD ["npm", "start"]
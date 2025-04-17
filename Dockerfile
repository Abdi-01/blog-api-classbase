FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy and install dependencies
COPY package*.json ./
RUN npm install

# Copy project files
COPY . .

RUN npm install -g nodemon

# Expose API port
EXPOSE 8083

# Run APP
CMD [ "npm","run","dev" ]
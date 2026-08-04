FROM node:20-alpine
WORKDIR /usr/src/backend

# Copy package manifests first to leverage docker cache
COPY package*.json ./

RUN npm install

# Copy application source
COPY . .

# Expose the application port
ENV PORT=3000
EXPOSE ${PORT}

# Copy entrypoint and ensure it's executable
COPY docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

# Default entrypoint runs migrations then starts the app
ENTRYPOINT ["sh", "/usr/local/bin/docker-entrypoint.sh"]

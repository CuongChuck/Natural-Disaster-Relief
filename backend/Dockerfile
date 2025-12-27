FROM node:20-alpine

# Install build tools needed by some native deps (mysql2, bcrypt)
RUN apk add --no-cache python3 make g++ libc6-compat

WORKDIR /usr/src/app

# Copy package manifests first to leverage docker cache
COPY package*.json ./

# Install all dependencies (including devDependencies because we need sequelize-cli for migrations)
RUN npm ci --no-audit --prefer-offline

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

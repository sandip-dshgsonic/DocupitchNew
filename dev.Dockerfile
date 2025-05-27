



#3333333333333333333333333333333333 working


# FROM node:18-slim

# # # Install required packages
# RUN apt-get update && apt-get install -y openssl bash \
#     && rm -rf /var/lib/apt/lists/*

# # Set the working directory
# WORKDIR /app

# # Copy dependency files and install dependencies
# COPY package.json package-lock.json ./
# RUN npm install

# # Add node_modules/.bin to PATH
# ENV PATH /app/node_modules/.bin:$PATH

# # Copy the Prisma schema and regenerate the Prisma client
# COPY prisma ./prisma
# RUN npx prisma generate

# # Copy the remaining application source code
# COPY . .

# # Expose the application port
# EXPOSE 3000

# # Set environment variable
# ENV NODE_ENV=production
# # ENV NODE_ENV=development

# # Start the application
# CMD ["npm", "run", "dev"]

#3333333333333333333333333333333333 working end

#3333333333333333333333333333333333  working using npm build 

FROM node:18-slim AS builder
# Install required packages
RUN apt-get update && apt-get install -y openssl bash \
    && rm -rf /var/lib/apt/lists/*
# Set working directory
WORKDIR /app
# Copy dependency files
COPY package.json package-lock.json ./
RUN npm install
# Copy the rest of the code
COPY . .
# Generate Prisma client
RUN npx prisma generate
# Build the application
RUN npm run build
# Production image
FROM node:18-slim AS runner
WORKDIR /app
# Install only production dependencies
COPY --from=builder /app/package.json /app/package-lock.json ./
RUN npm install 
# Install required packages
RUN apt-get update && apt-get install -y openssl bash \
    && rm -rf /var/lib/apt/lists/*
# Copy built application
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
# Set environment variables
ENV NODE_ENV=production
# Expose port
EXPOSE 3000
# Start the application in production mode
# CMD ["npm", "start"]
CMD ["sh", "-c", "npx prisma migrate deploy && npm start"]

# 3333333333333333333333333333333333  working using npm build end

# error app-1  | Error: Could not find a production build in the '.next' directory.
#  Try building your app with 'next build' before starting the production server.
#   https://nextjs.org/docs/messages/production-start-no-build-id
# there is no build id present in the .next folder.
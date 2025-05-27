# Stage 1: Install dependencies only when needed
FROM node:18-alpine AS deps

# Install system dependencies
RUN apk add --no-cache libc6-compat

WORKDIR /app

# Copy package.json and package-lock.json files
COPY package.json package-lock.json ./

# Install dependencies using npm
RUN npm install

# Stage 2: Build the website
FROM node:18-alpine AS builder

WORKDIR /app

# Copy the installed node_modules from the deps stage
COPY --from=deps /app/node_modules ./node_modules

# Copy the rest of your application code
COPY . .

# Build the Next.js website
RUN npm run build

# Stage 3: Production image to serve the Next.js website
FROM node:18-alpine AS runner

WORKDIR /app

ENV NODE_ENV production
ENV PORT 3000

# Create a non-root user for better security
RUN addgroup -S nextjs && adduser -S nextjs -G nextjs

# Copy necessary files from the builder stage
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Set user and expose port
USER nextjs
EXPOSE 3000

# Run the Next.js website
CMD ["node", "server.js"]

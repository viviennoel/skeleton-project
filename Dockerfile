# Stage 1: Build
FROM node:18-alpine AS builder
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Build the Next.js app
RUN npm run build

# Stage 2: Run
FROM node:18-alpine
WORKDIR /app

# Install production dependencies only
COPY package.json package-lock.json ./
RUN npm install --production

# Copy the built app from the builder stage
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json

# Expose the port the app will run on
EXPOSE 3000

# Start the production server
CMD ["npm", "start"]

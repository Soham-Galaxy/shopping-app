# Use lightweight Node.js runtime
FROM node:20-alpine

# Create non-root user (security best practice)
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# App directory
WORKDIR /app

# Copy dependency definitions first (better caching)
COPY package*.json ./

# Install only production dependencies
RUN npm ci --only=production

# Copy application source
COPY . .

# Environment defaults (overridden by Kubernetes)
ENV NODE_ENV=production
ENV PORT=5000

# App port
EXPOSE 5000

# Drop privileges
USER appuser

# Start backend
CMD ["node", "src/server.js"]


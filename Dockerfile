# Railway Dockerfile
# Backend runs via tsx (no bundling needed)
# Frontend is built with Vite

FROM node:20-alpine

WORKDIR /app

# Install dependencies
COPY package.json package-lock.json* ./
RUN npm ci

# Copy source code
COPY . .

# Build frontend only
RUN npm run build

# Environment
ENV NODE_ENV=production
ENV PORT=3000

EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -qO- http://localhost:3000/api/health || exit 1

# Start with tsx (runs TypeScript directly)
CMD ["npx", "tsx", "api/boot.ts"]

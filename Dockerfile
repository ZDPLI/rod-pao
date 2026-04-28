# ============================================
# Dockerfile для ГБУЗ "РОД" ПАО на Railway
# Fullstack: Vite React frontend + Hono backend
# ============================================

FROM node:20-alpine

WORKDIR /app

# 1. Install dependencies first (for better caching)
COPY package.json package-lock.json* ./
RUN npm ci --omit=dev

# 2. Re-install devDependencies needed for build
RUN npm ci

# 3. Copy source code
COPY . .

# 4. Build everything (frontend + backend)
RUN npm run build

# 5. Remove devDependencies for production
RUN npm prune --omit=dev

# Environment
ENV NODE_ENV=production
ENV PORT=3000

EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -qO- http://localhost:3000/api/health || exit 1

CMD ["node", "dist/boot.js"]

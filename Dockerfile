# ── Stage 1: build ──────────────────────────────────────────────
FROM node:16-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm ci --silent

COPY . .
# CI=false prevents treating warnings as errors
RUN CI=false npm run build

# ── Stage 2: serve ──────────────────────────────────────────────
FROM nginx:stable-alpine
WORKDIR /usr/share/nginx/html

# Remove default nginx config; use the app's own
RUN rm -rf /etc/nginx/conf.d
COPY conf /etc/nginx

COPY --from=builder /app/build .

# Runtime env injection script (replaces window._env_ at container start)
COPY env.sh .
RUN chmod +x env.sh && apk add --no-cache bash

EXPOSE 80
CMD ["/bin/bash", "-c", "./env.sh && nginx -g 'daemon off;'"]

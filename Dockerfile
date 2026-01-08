FROM node:18-alpine

# Install Chromium and dependencies for whatsapp-web.js
RUN apk add --no-cache \
  chromium \
  nss \
  freetype \
  harfbuzz \
  ca-certificates \
  ttf-freefont \
  dumb-init

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

ENTRYPOINT ["dumb-init", "--"]
CMD ["npm", "start"]

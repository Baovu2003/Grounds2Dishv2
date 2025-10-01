FROM node:20-alpine

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci --omit=dev || npm install --omit=dev

COPY . .

RUN mkdir -p public/uploads \
  && chown -R node:node public/uploads

ENV PORT=3002
EXPOSE 3002

USER node

CMD ["node", "server.js"]


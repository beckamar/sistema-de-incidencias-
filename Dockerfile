# Construir el frontend (React)
FROM node:20 AS frontend-builder
WORKDIR /app
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ .
RUN npm run build  # Asegúrate de que "build" esté definido en frontend/package.json

# Construir el backend (Node.js)
FROM node:20
WORKDIR /app

COPY backend/package*.json ./
RUN npm install

COPY backend/ .

COPY --from=frontend-builder /app/dist ./public

EXPOSE 5001

CMD ["node", "server.js"]
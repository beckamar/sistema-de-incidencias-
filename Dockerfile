FROM node:20 AS frontend
WORKDIR /app
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ .
RUN npm run build

# Etapa 2: Backend con frontend embebido
FROM node:20
WORKDIR /app

# Copiar y preparar el backend
COPY backend/package*.json ./
RUN npm install
COPY backend/ .

# Copiar el build del frontend al backend
COPY --from=frontend /app/dist ./public

EXPOSE 5001
CMD ["node", "server.js"]
# 📋 Sistema de Gestión de Incidencias

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white)

Aplicación web para gestión de incidencias:
- Frontend en React.js
- Backend en Node.js/Express
- Base de datos PostgreSQL
- Docker 

## 🚀 Instalación

### Requisitos previos
- Docker 20.10+
- Docker Compose 2.0+
- Node.js 18+ (solo para desarrollo)

### Ejecución con Docker (recomendado)
```bash
git clone https://github.com/beckamar/sistema-de-incidencias-.git
cd sistema-de-incidencias-
docker-compose up -d
```

### 🔔 Notificaciones Push (Firebase)
Las credenciales actuales de Firebase están deshabilitadas. Para activar:
Crea un proyecto en Firebase Console
Habilita Firebase Cloud Messaging (FCM)
Configura en backend/.env:


### 🔍 Características principales

- Ingreso por rol: Superintendente/Jefe ó Empleado
- Dashboard para administrar incidencias (rol de Superintendente/Jefe)
- Creación de incidencias (rol de Empleado)
- Notificaciones (requiere configuración de Firebase)
- Estadísticas

## 📸 Diagrama bd
- ![Ingreso](https://raw.githubusercontent.com/beckamar/sistema-de-incidencias-/main/screenshots/diagramaBD.png) 


## 📸 Interfaz Gráfica

### Ingreso
- ![Ingreso](https://raw.githubusercontent.com/beckamar/sistema-de-incidencias-/main/screenshots/ingreso.png) 

### Dashboard Admin
- ![Vista general](https://raw.githubusercontent.com/beckamar/sistema-de-incidencias-/main/screenshots/adminDashboard.png)
- ![Tabla](https://raw.githubusercontent.com/beckamar/sistema-de-incidencias-/main/screenshots/adminTabla.png)
- ![Reporte incidente](https://raw.githubusercontent.com/beckamar/sistema-de-incidencias-/main/screenshots/adminIncidente.png)
- ![Resumen](https://raw.githubusercontent.com/beckamar/sistema-de-incidencias-/main/screenshots/adminResumen.png)

### Reporte incidente

-  ![Reporte incidente](https://raw.githubusercontent.com/beckamar/sistema-de-incidencias-/main/screenshots/inicioReporte.png)
-  ![Envio reporte](https://raw.githubusercontent.com/beckamar/sistema-de-incidencias-/main/screenshots/envioReporte.png)

-  


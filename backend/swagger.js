import swaggerAutogen from 'swagger-autogen';

const doc = {
    info: {
        title: 'API - Gestion de Incidencias',
        description: 'Documentación de la API para la gestión de incidencias',
    },
    host: 'localhost:5001',
    schemes: ['http'],
};

const outputFile = './swagger.json';
const endpointsFiles = ['./server.js']; 

swaggerAutogen()(outputFile, endpointsFiles, doc);
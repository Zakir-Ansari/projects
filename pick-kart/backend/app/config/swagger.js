const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const path = require('path');

const isVercel = process.env.VERCEL === '1';

const serverUrl = isVercel
  ? 'https://pick-kart-api.vercel.app' // Vercel URL
  : `http://localhost:${process.env.PORT}`; // Local development URL

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Pick Kart API',
      version: '1.0.0',
      description: 'API Documentation for the E-Commerce Application: Pick Kart.',
    },
    servers: [
      {
        url: `${serverUrl}/api`,
        description: isVercel ? 'Production server (Vercel)' : 'Development server (localhost)',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        Product: {
          type: 'object',
          properties: {
            _id: { type: 'string', example: '65bfc437e8298c4f9eeb27d9' },
            name: { type: 'string', example: 'T-Shirt' },
            price: { type: 'number', example: 25 },
            description: { type: 'string', example: 'A cool t-shirt' },
            stock: { type: 'number', example: 10 },
            size: { type: 'array', items: { type: 'string' }, example: ['S', 'M', 'L'] },
            images: { type: 'array', items: { type: 'string' }, example: ['https://example.com/image1.jpg'] },
            category: { type: 'string', example: '65bfc437e8298c4f9eeb27e8' },
            createdBy: {
              type: 'object',
              properties: {
                username: { type: 'string', example: 'seller123' },
                profile: {
                  type: 'object',
                  properties: {
                    firstName: { type: 'string', example: 'John' },
                    lastName: { type: 'string', example: 'Doe' },
                  },
                },
              },
            },
          },
        },
        Order: {
          type: 'object',
          properties: {
            _id: { type: 'string', example: '65bfc437e8298c4f9eeb27d9' },
            product: { type: 'string', example: '65bfc437e8298c4f9eeb27e8' },
            selectedSize: { type: 'string', example: 'M' },
            buyer: { type: 'string', example: '65bfc437e8298c4f9eeb27d5' },
            quantity: { type: 'number', example: 2 },
            status: {
              type: 'string',
              enum: ['Submitted', 'Accepted', 'Shipped', 'Delivered', 'Cancelled'],
              example: 'Submitted',
            },
          },
        },
        User: {
          type: 'object',
          properties: {
            _id: { type: 'string', example: '65bfc437e8298c4f9eeb27d5' },
            username: { type: 'string', example: 'user123' },
            email: { type: 'string', example: 'user@example.com' },
            role: { type: 'string', enum: ['Admin', 'Seller', 'User'], example: 'User' },
            profile: {
              type: 'object',
              properties: {
                firstName: { type: 'string', example: 'John' },
                lastName: { type: 'string', example: 'Doe' },
              },
            },
          },
        },
      },
      security: [{ bearerAuth: [] }],
    },
  },
  apis: [path.join(__dirname, '../routes/*.js')], // Path to the API routes folder
};

const swaggerSpec = swaggerJsdoc(options);

const swaggerDocs = app => {
  app.use('/swagger-ui', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log(`Swagger UI available at ${serverUrl}/swagger-ui`);
};

module.exports = swaggerDocs;

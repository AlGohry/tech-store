import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import errorHandler from './middleware/errorMiddleware.js'
import authRoutes from './routes/authRoutes.js'
import productRoutes from './routes/productRoutes.js'
import swaggerUi from 'swagger-ui-express'
import swaggerJsdoc from 'swagger-jsdoc'
import connectDB from './config/db.js';

dotenv.config()

// Initialize Express app
const app = express()

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Tech Store API',
      version: '1.0.0',
      description: 'API documentation for Tech Store project',
    },
    servers: [
      {
        url: 'http://localhost:5000',
      },
    ],
    security: [{
      bearerAuth: []
    }]
  },
  apis: [
    './routes/authRoutes.js',
    './routes/productRoutes.js',
  ],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

// Middleware
app.use(cors())
app.use(express.json())
app.use(errorHandler)


// Routes
app.use('/api/auth', authRoutes)
app.use('/api/products', productRoutes)


app.get('/', (req, res) => {
  res.send('Tech Store API is running...')
})


// MongoDB connection
connectDB(); 

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

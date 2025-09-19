// app.js

// Load environment variables BEFORE any process.env usage
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });

const express = require('express'); 
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

/**
 * Hard-coded configuration (can be overridden by process.env if set)
 */
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
process.env.PORT = process.env.PORT || '8080';
process.env.SECRET = process.env.SECRET || 'EduApp2020';
process.env.MONGODB_URI_LOCAL = process.env.MONGODB_URI_LOCAL || 'mongodb://localhost:27017/meantr_sophia_V2';

// Debug environment
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('PORT:', process.env.PORT);
console.log('Mongo URI:', process.env.MONGODB_URI_LOCAL);
console.log('JWT Secret:', process.env.SECRET ? '***loaded***' : 'MISSING');

// Database Initialize
if (!process.env.MONGODB_URI_LOCAL) {
  console.error('❌ MONGODB_URI_LOCAL is not set! Please hardcode it in app.js');
  process.exit(1);
}

mongoose
  .connect(process.env.MONGODB_URI_LOCAL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('✅ Education Database Connected'))
  .catch((err) => console.error('❌ DB Connection Error:', err));

mongoose.Promise = global.Promise;
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

const app = express();
app.use(bodyParser.urlencoded({ limit: '50mb', extended: false }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// ✅ CORS headers (restricted to localhost:3000 and localhost:4200)
app.use((req, res, next) => {
  const allowedOrigins = ['http://localhost:3000', 'http://localhost:4200','https://www.appsophia.com'];
  const origin = req.headers.origin;

  if (allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }

  res.header(
    'Access-Control-Allow-Methods',
    'GET,HEAD,OPTIONS,POST,PUT,PATCH,DELETE'
  );
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );

  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }

  next();
});

// Routes
app.use('/edu/api', require('./controllers'));

module.exports = app;

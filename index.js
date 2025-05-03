import express from 'express';
import cors from 'cors';
import compression from 'compression';
import helmet from 'helmet';
import path from 'path';
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';

// import superAdmin from './routes/superAdmin.route.js';
import { authLimiter } from './middlewares/ratelimiter.middleware.js';
import errorHandler from './middlewares/error.middleware.js';

import routes from './routes/index.route.js';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 2024;

// Middlewares
// app.enable('trust proxy')
app.set('trust proxy', 1)
app.use(compression());
app.use(helmet());


// app.use(morgan('combined', { stream: logger.stream }));

app.use(cors());

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());

app.use(express.json(({
    limit: '100mb',
    extended: true
})));
app.use(express.urlencoded({ extended: true }));



if (process.env.NODE_ENV === 'production') {
    app.use('', authLimiter);
}

app.use('/api/test', (req, res) => res.send('Test works'));
app.use('/api', routes);
app.get('/', (req, res) => {
    res.json({ message: `All Set! 🚀` });
});


app.use((req, res) => {
    res.status(404).json({ message: 'The requested URL was not found on this server.' });
});

app.use(errorHandler);


app.listen(PORT, async () => {
    console.log('Server running on port:', PORT);
});

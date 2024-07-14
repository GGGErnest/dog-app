import cors from 'cors';
import 'dotenv/config';
import express, { Express } from 'express';
import helmet from 'helmet';
import { routes } from './routes/routes';
import { Settings } from './types/interfaces/settings';

const app: Express = express();

const corsOptions = {
	origin: '*', // replace [DOCKER_HOST_IP] with the actual IP
	optionsSuccessStatus: 200
}

// Middleware
app.use(helmet());
app.use(cors(corsOptions));
app.use(express.json());

app.use(routes);
app.listen(Settings.port, 'localhost', () => {
	console.log(`Server listening on port ${Settings.port}`)
})

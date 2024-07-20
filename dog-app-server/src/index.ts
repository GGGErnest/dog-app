import cors from 'cors';
import 'dotenv/config';
import express, { Express } from 'express';
import helmet from 'helmet';
import { routes } from './routes/routes';
import { Settings } from './types/app-settings';
import { ConsoleLogger } from './types/console-logger';

const app: Express = express();

const corsOptions = {
	origin: '*',
	optionsSuccessStatus: 200
}

// Middleware
app.use(helmet());
app.use(cors(corsOptions));
app.use(express.json());

app.use(routes);
app.listen(Settings.port, 'localhost', () => {
	ConsoleLogger.instance.info(`Server listening on port ${Settings.port}`);
})

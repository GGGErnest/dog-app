import cors from 'cors';
import 'dotenv/config';
import express, { Express } from 'express';
import helmet from 'helmet';
import { routes } from './routes/routes';
import { Settings } from './types/app-settings';
import { ConsoleLogger } from './types/console-logger';
import { MemoryCache } from './features/cache';
import { BreedDataConnector } from './models/breeds-data-connector';
import { BreedModel } from './models/breed-model';

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

// Initializing the Cache and registering the connectors 
const { expiresAfterMin, limit, oldItemsThresholdHours, cleaningFrequencyMs } = Settings.cache;
MemoryCache.getInstance(expiresAfterMin, limit, oldItemsThresholdHours, cleaningFrequencyMs);
MemoryCache.getInstance().registerConnector(BreedModel.entityId, new BreedDataConnector())
app.listen(Settings.port, 'localhost', () => {
	ConsoleLogger.instance.info(`Server listening on port ${Settings.port}`);
})

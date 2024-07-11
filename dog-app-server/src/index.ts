import express, { Express } from 'express';
import 'dotenv/config';
import { Settings } from './types/interfaces/settings';
import { router } from './routes/routes';

const app: Express = express();

app.use(express.json);
app.use(router);
app.listen(Settings.port, () => {
	console.log(`Example app listening on port ${Settings.port}`)
})

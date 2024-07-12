import cors from 'cors';
import 'dotenv/config';
import express, { Express } from 'express';
import helmet from 'helmet';
import { registerRoutes } from './routes/routes';
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

registerRoutes(app);

// const routesAux: any[] = [];
// app._router.stack.forEach((middleware: any) => {
// 	if (middleware.route) {
// 		routesAux.push(
// 			`${Object.keys(middleware.route.methods)} -> ${middleware.route.path}`
// 		);
// 	}
// });
//
// console.log(JSON.stringify(routesAux, null, 2));
app.listen(Settings.port, 'localhost', () => {
	console.log(`Server listening on port ${Settings.port}`)
})

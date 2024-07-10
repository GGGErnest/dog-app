import express, { Express } from 'express'
import 'dotenv/config'
import { Settings } from './types/settings'

const app: Express = express();

app.use(express.json);
app.listen(Settings.port, () => {
	console.log(`Example app listening on port ${Settings.port}`)
})

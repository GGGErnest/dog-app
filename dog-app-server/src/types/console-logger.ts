import { Logger } from './interfaces/logger';

export class ConsoleLogger implements Logger {
	private static _instance: ConsoleLogger;

	// eslint-disable-next-line @typescript-eslint/no-empty-function
	private constructor() {
	}

	public static get instance(): ConsoleLogger {
		if (!ConsoleLogger._instance) {
			ConsoleLogger._instance = new ConsoleLogger();
		}
		return ConsoleLogger._instance;
	}

	info(message: string, data?: unknown): void {
		if (data) {
			console.info(message, data);
			return;
		}

		console.info(message);
	}
	warn(message: string, data?: unknown): void {
		if (data) {
			console.warn(message, data);
			return;
		}

		console.warn(message, data);
	}
	error(message: string, data?: unknown): void {
		if (data) {
			console.error(message, data);
			return;
		}

		console.error(message, data);

	}

}


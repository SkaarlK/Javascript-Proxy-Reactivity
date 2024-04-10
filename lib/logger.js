// IMPORTS
import { createLogger, transports, format } from 'winston';

// HELPERS && 
// INIT
const { combine, timestamp, colorize, printf } = format;

const colorFormat = combine(timestamp(), colorize({ level: true, message: false }), printf(info => `${info.timestamp} ${info.level}: ${info.message}`));

const consoleTransport = new transports.Console({ level: 'debug', format: colorFormat });
const logger = createLogger({ transports: [consoleTransport] });

const submitLog = function(level, message) {
	const objectString = [...message].map(x => {
		let messages = x;

		if (typeof x === 'object')
			messages = JSON.stringify(x);
		
		return messages;
	}).join(' ');
	logger.log({ level, message: objectString });
}


const logError = (...args) => submitLog('error', args);

const logWarn = (...args) => submitLog('warn', args);

const log = (...args) => submitLog('info', args);

const logHttp = (...args) => submitLog('http', args);

const logDebug = (...args) => submitLog('debug', args);

const logSilly = (...args) => submitLog('silly', args);

const logTime = (timeLog) => {
	if (timeLog) {
		const ONE_SECOND_IN_MS = 1000;
		const timeLogString = `${timeLog.context} - Time: ${(new Date() - timeLog.start) / ONE_SECOND_IN_MS}`;
		log(timeLogString);
	}
}

const startTime = (context) => ({ context, start: new Date() });

const logReactivity = (state) => {
	log(`price: ${state.price}, quantity: ${state.quantity}`)
	log(`total: ${state.total()}`)
	log(`total with taxes: ${state.totalWithTaxes()}`)
}

export { logReactivity, log, logDebug, logError, logHttp, logWarn, logSilly, logTime, startTime };

/** /
{
	error: 0,
	warn: 1,
	info: 2,
	http: 3,
	verbose: 4,
	debug: 5,
	silly: 6
}
/**/

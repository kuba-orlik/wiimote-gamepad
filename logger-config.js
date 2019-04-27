class LoggerConfig {
	constructor() {}

	start(device) {
		device.on("input", event => {
			if (event.key_code == 0) {
				return;
			}
			console.log(event.key_code);
		});
	}
}

module.exports = LoggerConfig;

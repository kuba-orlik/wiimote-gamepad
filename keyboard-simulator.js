const Simulator = require("./simulator.js");
const uinput = require("./uinput");

class KeyboardSimulator extends Simulator {
	constructor() {
		const event_names = Object.keys(uinput).filter(event_name =>
			event_name.startsWith("KEY_")
		);
		console.log(event_names);

		super(
			{
				name: "Custom device",
				vendor: 0x1337,
				product: 0x1010,
				version: 1,
			},
			event_names
		);
	}
}

module.exports = KeyboardSimulator;

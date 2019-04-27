const Simulator = require("./simulator.js");

class XboxControllerSimulator extends Simulator {
	constructor() {
		super(
			// https://www.the-sz.com/products/usbid/index.php?v=0x045E
			{
				name: "Microsoft X-Box 360 pad",
				vendor: 0x045e,
				product: 0x028e,
				version: 1,
			},
			[
				"A",
				"B",
				"X",
				"Y",
				"TR",
				"TL",
				"TR2",
				"TL2",
				"SELECT",
				"START",
				"MODE",
				"DPAD_UP",
				"DPAD_DOWN",
				"DPAD_LEFT",
				"DPAD_RIGHT",
			].map(btn_name => `BTN_${btn_name}`)
		);
	}
}

module.exports = XboxControllerSimulator;

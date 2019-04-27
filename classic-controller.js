const WiiDevice = require("./wii-device.js");
const LoggerConfig = require("./logger-config.js");
const Config = require("./config");
const KeyboardSimulator = require("./keyboard-simulator.js");
const XboxPadSimulator = require("./xbox-pad-simulator.js");

class ClassicController extends WiiDevice {
	constructor(...args) {
		super(...args);

		this.setupButtons({
			A: 48,
			B: 49,
			Y: 52,
			X: 51,
			MINUS: 156,
			HOME: 60,
			PLUS: 151,
			RIGHT: 106,
			LEFT: 105,
			UP: 103,
			DOWN: 108,
			ZR: 57,
			R: 55,
			ZL: 56,
			L: 54,
		});

		this.configs = {
			"Xbox360 controller": new Config(XboxPadSimulator, {
				button_to_original_keycode: this.buttons,
				button_to_simulated_event_name: {
					A: "BTN_A",
					B: "BTN_B",
					Y: "BTN_Y",
					X: "BTN_X",
					UP: "BTN_DPAD_UP",
					DOWN: "BTN_DPAD_DOWN",
					LEFT: "BTN_DPAD_LEFT",
					RIGHT: "BTN_DPAD_RIGHT",
					PLUS: "BTN_START",
					MINUS: "BTN_SELECT",
					HOME: "BTN_MODE",
					R: "BTN_TR",
					L: "BTN_TL",
					ZL: "BTN_TL2",
					ZR: "BTN_TR2",
				},
			}),
			"Xbox360 controller - swap DPAD X/Y (starwhal)": new Config(
				XboxPadSimulator,
				{
					button_to_original_keycode: this.buttons,
					button_to_simulated_event_name: {
						A: "BTN_A",
						B: "BTN_B",
						Y: "BTN_Y",
						X: "BTN_X",
						UP: "BTN_DPAD_LEFT",
						DOWN: "BTN_DPAD_RIGHT",
						LEFT: "BTN_DPAD_UP",
						RIGHT: "BTN_DPAD_DOWN",
						PLUS: "BTN_START",
						MINUS: "BTN_SELECT",
						HOME: "BTN_MODE",
						R: "BTN_TR",
						L: "BTN_TL",
						ZL: "BTN_TL2",
						ZR: "BTN_TR2",
					},
				}
			),
			logger: new LoggerConfig(),
			"literal abxy (keyboard)": new Config(KeyboardSimulator, {
				button_to_original_keycode: this.buttons,
				button_to_simulated_event_name: {
					A: "KEY_A",
					B: "KEY_B",
					Y: "KEY_Y",
					X: "KEY_X",
					MINUS: "KEY_MINUS",
					HOME: "KEY_ESC",
					PLUS: "KEY_EQUAL",
					RIGHT: "KEY_RIGHT",
					LEFT: "KEY_LEFT",
					UP: "KEY_UP",
					DOWN: "KEY_DOWN",
					ZR: "KEY_Z",
					R: "KEY_R",
					ZL: "KEY_Q",
					L: "KEY_L",
				},
			}),
		};
	}
}

WiiDevice.registerType(
	'"Nintendo Wii Remote Classic Controller"',
	ClassicController
);

module.exports = ClassicController;

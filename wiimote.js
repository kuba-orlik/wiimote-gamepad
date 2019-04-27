const WiiDevice = require("./wii-device.js");
const Config = require("./config.js");
const KeyboardSimulator = require("./keyboard-simulator.js");
const XboxPadSimulator = require("./xbox-pad-simulator.js");
const LoggerConfig = require("./logger-config.js");

class Wiimote extends WiiDevice {
	constructor(...args) {
		super(...args);

		this.setupButtons({
			A: 48,
			B: 49,
			MINUS: 156,
			HOME: 60,
			PLUS: 151,
			ONE: 1,
			TWO: 2,
			RIGHT: 106,
			LEFT: 105,
			UP: 103,
			DOWN: 108,
		});

		this.configs = {
			"Xbox360 controller": new Config(XboxPadSimulator, {
				button_to_original_keycode: this.buttons,
				button_to_simulated_event_name: {
					TWO: "BTN_A",
					ONE: "BTN_B",
					B: "BTN_Y",
					A: "BTN_X",
					UP: "BTN_DPAD_LEFT",
					DOWN: "BTN_DPAD_RIGHT",
					LEFT: "BTN_DPAD_DOWN",
					RIGHT: "BTN_DPAD_UP",
					PLUS: "BTN_START",
					MINUS: "BTN_SELECT",
					HOME: "BTN_MODE",
				},
			}),
			"Xbox360 controller - Towerfall": new Config(XboxPadSimulator, {
				button_to_original_keycode: this.buttons,
				button_to_simulated_event_name: {
					TWO: "BTN_B",
					ONE: "BTN_Y",
					B: "BTN_TR",
					A: "BTN_X",
					UP: "BTN_DPAD_LEFT",
					DOWN: "BTN_DPAD_RIGHT",
					LEFT: "BTN_DPAD_DOWN",
					RIGHT: "BTN_DPAD_UP",
					PLUS: "BTN_START",
					MINUS: "BTN_A",
					HOME: "BTN_MODE",
				},
			}),
			"Xbox360 controller - swap dpad X/Y (Starwhal)": new Config(
				XboxPadSimulator,
				{
					button_to_original_keycode: this.buttons,
					button_to_simulated_event_name: {
						TWO: "BTN_A",
						ONE: "BTN_B",
						B: "BTN_Y",
						A: "BTN_X",
						UP: "BTN_DPAD_UP",
						DOWN: "BTN_DPAD_DOWN",
						LEFT: "BTN_DPAD_RIGHT",
						RIGHT: "BTN_DPAD_LEFT",
						PLUS: "BTN_START",
						MINUS: "BTN_SELECT",
						HOME: "BTN_MODE",
					},
				}
			),
			wsad: new Config(KeyboardSimulator, {
				button_to_original_keycode: this.buttons,
				button_to_simulated_event_name: {
					A: "KEY_Q",
					B: "KEY_E",
					UP: "KEY_A",
					DOWN: "KEY_D",
					LEFT: "KEY_S",
					RIGHT: "KEY_W",
					HOME: "KEY_ESC",
					MINUS: "KEY_Z",
					PLUS: "KEY_X",
					ONE: "KEY_1",
					TWO: "KEY_2",
				},
			}),
			"Keyboard - 0123..": new Config(KeyboardSimulator, {
				button_to_original_keycode: this.buttons,
				button_to_simulated_event_name: {
					A: "KEY_0",
					B: "KEY_1",
					UP: "KEY_2",
					DOWN: "KEY_3",
					LEFT: "KEY_4",
					RIGHT: "KEY_5",
					TWO: "KEY_6",
					MINUS: "KEY_7",
					PLUS: "KEY_8",
					ONE: "KEY_9",
					HOME: "KEY_ESC",
				},
			}),
			"Keyboard - QWERTY": new Config(KeyboardSimulator, {
				button_to_original_keycode: this.buttons,
				button_to_original_keycode: this.buttons,
				button_to_simulated_event_name: {
					A: "KEY_Q",
					B: "KEY_W",
					UP: "KEY_E",
					DOWN: "KEY_R",
					LEFT: "KEY_T",
					RIGHT: "KEY_Y",
					TWO: "KEY_U",
					MINUS: "KEY_I",
					PLUS: "KEY_O",
					ONE: "KEY_P",
					HOME: "KEY_ESC",
				},
			}),
			logger: new LoggerConfig(),
		};
	}
}

WiiDevice.registerType('"Nintendo Wii Remote"', Wiimote);

module.exports = Wiimote;

const fs = require("fs");
const ioctl = require("ioctl");
const uinput = require("./uinput");
const uuid = require("uuid/v1");
const EventEmitter = require("events");
const { spawn } = require("child_process");
const KeyboardSimulator = require("./keyboard-simulator.js");

class WiiDeviceEvent {
	constructor(buffer, wii_device) {
		this.key_code = buffer[18];
		this.button_name = wii_device.keycodes[this.key_code];
		this.type = buffer[20] ? "press" : "release";
		this.direction = buffer[20] ? "down" : "up";
		this.buffer = buffer;
		this.wii_device = wii_device;
	}
}

const WIIMOTE_EVENT_BYTESIZE = 24;

const types = {};

class WiiDevice extends EventEmitter {
	constructor({ name, handlers }) {
		super();
		this.handlers = handlers;
		this.name = name;
		this.handler_file = this.get_handler_file(handlers);
		this.id = uuid();
		this.setup_temporary_listener();
		this.buttons = {};
		this.keycodes = {};
	}

	static registerType(name, constructor) {
		types[name] = constructor;
	}

	static fromDesc(desc) {
		return new types[desc.name](desc);
	}

	static getPossibleTypes() {
		return Object.keys(types);
	}

	setupButtons(button_name_to_original_evcode) {
		this.buttons = button_name_to_original_evcode;
		this.keycodes = {};

		for (let button in this.buttons) {
			this.keycodes[this.buttons[button]] = button;
		}
	}

	setup_temporary_listener() {
		this.cat = spawn("cat", [this.handler_file]);
		this.stream = this.cat.stdout;
		this.pressed_buttons_count = 0;
		this.stream.on("data", buf => {
			while (buf.length) {
				let slice = buf.slice(0, WIIMOTE_EVENT_BYTESIZE);
				this.emit("input", new WiiDeviceEvent(slice, this));
				buf = buf.slice(WIIMOTE_EVENT_BYTESIZE);
			}
		});
	}

	setup_permanent_listener() {
		if (this.cat) {
			this.cat.kill();
		}
		const handler_file_fd = fs.openSync(this.handler_file);
		try {
			// grabbing device: https://unix.stackexchange.com/questions/492909/access-grab-state-of-evdev-device
			ioctl(handler_file_fd, uinput.EVIOCGRAB, 0x1);
			console.log("grabbed device");
		} catch (e) {
			console.error("Couldn't grab device.");
			console.error(e);
			process.exit(13);
		}
		const stream = fs.createReadStream("any", { fd: handler_file_fd });
		stream.on("data", buf => {
			while (buf.length) {
				let slice = buf.slice(0, WIIMOTE_EVENT_BYTESIZE);
				this.emit("input", new WiiDeviceEvent(slice, this));
				buf = buf.slice(WIIMOTE_EVENT_BYTESIZE);
			}
		});
	}

	has_handler(handler_name) {
		return this.handlers.includes(handler_name);
	}

	get_handler_file(handlers) {
		return `/dev/input/${
			handlers.filter(handler => handler.startsWith("event"))[0]
		}`;
	}

	setConfig(config_key) {
		this.configs[config_key].start(this);
	}

	close() {
		// console.log("Closing the stream for", this.id);
		this.removeAllListeners();
	}
}

module.exports = WiiDevice;

require("./wiimote.js");
require("./classic-controller.js");

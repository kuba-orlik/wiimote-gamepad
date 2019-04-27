const fs = require("fs");
const ioctl = require("ioctl");
const uinput = require("./uinput");

const { O_NONBLOCK, O_WRONLY } = fs.constants;

class Simulator {
	constructor({ name, vendor, product, version }, event_names) {
		this.fd = fs.openSync("/dev/uinput", O_WRONLY | O_NONBLOCK);

		const bustype = 0x3; // USB

		const buff = Buffer.alloc(1116);
		buff.fill(0);
		buff.write(name, 0, 80);
		buff.writeUInt16LE(bustype, 80);
		buff.writeUInt16LE(vendor, 82);
		buff.writeUInt16LE(product, 84);
		buff.writeUInt16LE(version, 86);

		fs.writeSync(this.fd, buff, 0, buff.length, null);
		ioctl(this.fd, uinput.UI_SET_EVBIT, uinput.EV_KEY);
		for (let event_name of event_names) {
			console.log("registering event", event_name, uinput[event_name]);
			ioctl(this.fd, uinput.UI_SET_KEYBIT, uinput[event_name]);
		}
		ioctl(this.fd, uinput.UI_DEV_CREATE, 0);
	}

	simulateEvent({ key_name, direction }) {
		//usage: simulateEvent({key_name: "KEY_A", direction: "down" | "up"});
		var ev = Buffer.alloc(24);
		ev.fill(0);

		var tv_sec = Math.round(Date.now() / 1000),
			tv_usec = Math.round((Date.now() % 1000) * 1000),
			type = 0x01, // EV_KEY,
			code = uinput[key_name],
			value = direction == "down" ? 1 : 0;

		ev.writeInt32LE(tv_sec, 0);
		ev.writeInt32LE(tv_usec, 8);
		ev.writeInt16LE(type, 16);
		ev.writeInt16LE(code, 18);
		ev.writeInt32LE(value, 20);

		var ev_sync_report = Buffer.alloc(24);
		ev_sync_report.fill(0);

		ev_sync_report.writeInt32LE(tv_sec, 0);
		ev_sync_report.writeInt32LE(tv_usec, 8);

		fs.writeSync(this.fd, ev, 0, ev.length, null);
		fs.writeSync(this.fd, ev_sync_report, 0, ev_sync_report.length, null);
	}
}

module.exports = Simulator;

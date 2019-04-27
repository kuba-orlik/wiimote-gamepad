const fs = require("fs");
const WiiDevice = require("./wii-device.js");
const EventEmitter = require("events");
const { spawn } = require("child_process");

class WiiDevices extends EventEmitter {
	constructor() {
		super();
		this.wii_devices = [];
		this.refresh_wii_devices();
		this.inotify = spawn("inotifywait", [
			"-m",
			"-r",
			"-e",
			"CREATE",
			"-e",
			"DELETE",
			"/dev/input",
		]).stdout;
		this.inotify.on("data", () => this.refresh_wii_devices());
	}

	static parseDevice(string) {
		const obj = {};
		string
			.split("\n")
			.map(line => line.split(": "))
			.filter(line_elements => ["N", "H"].includes(line_elements[0]))
			.map(line_elements => line_elements[1])
			.map(prop_desc => prop_desc.split("="))
			.forEach(
				prop_desc_elements =>
					(obj[prop_desc_elements[0].toLowerCase()] =
						prop_desc_elements[1])
			);
		if (obj.handlers) {
			obj.handlers = obj.handlers.trim().split(" ");
		}
		return obj;
	}

	is_wii_device_new(description) {
		return !description.handlers
			.filter(h => h != "kbd")
			.some(handler =>
				this.wii_devices.some(wii_device =>
					wii_device.has_handler(handler)
				)
			);
	}

	add_wii_device_if_new(description) {
		if (this.is_wii_device_new(description)) {
			const wii_device = WiiDevice.fromDesc(description);
			this.wii_devices.push(wii_device);
			this.emit("change");
		}
	}

	remove_wii_device_if_not_in_list(devices_list, wii_device) {
		if (
			!devices_list
				.map(e => e.handlers)
				.reduce((a, b) => a.concat(b), [])
				.filter(handler => handler != "kbd")
				.filter(handler => wii_device.has_handler(handler)).length
		) {
			wii_device.close();
			this.wii_devices.splice(
				this.wii_devices
					.map(wii_device => wii_device.id)
					.indexOf(wii_device.id),
				1
			);
			this.emit("change");
		}
	}

	refresh_wii_devices() {
		try {
			const devices = fs
				.readFileSync("/proc/bus/input/devices", "utf-8")
				.trim();
			const entries = devices
				.split("\n\n")
				.map(WiiDevices.parseDevice)
				.filter(d => WiiDevice.getPossibleTypes().includes(d.name));
			entries.forEach(wii_device_description =>
				this.add_wii_device_if_new(wii_device_description)
			);
			this.wii_devices.forEach(wii_device =>
				this.remove_wii_device_if_not_in_list(entries, wii_device)
			);
			return this.wii_devices;
		} catch (e) {
			console.error(e);
			return this.refresh_wii_devices();
		}
	}

	get_wii_devices() {
		return this.wii_devices;
	}

	quit() {
		this.wii_devices.forEach(wii_device => wii_device.close());
	}

	async wait_for_event() {
		return new Promise((resolve, reject) => {
			const listener = event => {
				this.wii_devices.forEach(wii_device =>
					wii_device.removeListener("input", listener)
				);
				resolve(event);
			};
			this.wii_devices.forEach(wii_device =>
				wii_device.once("input", listener)
			);
		});
	}
}

module.exports = new WiiDevices();

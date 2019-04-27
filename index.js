const WiiDevices = require("./wii-devices.js");
const WiiDevice = require("./wii-device.js");
const sleep = require("./sleep.js");
const inquirer = require("inquirer");

async function wait_for_wii_devices() {
	const wii_devices = WiiDevices.get_wii_devices();
	if (wii_devices.length) {
		return wii_devices;
	}
	console.log("Waiting for wii_devices...");
	await sleep(1000);
	return wii_devices.length ? wii_devices : await wait_for_wii_devices();
}

async function pick_wii_device() {
	let wii_devices = WiiDevices.get_wii_devices();
	if (wii_devices.length === 1) {
		return wii_devices[0];
	}
	console.log("Press any button on the wii_device you want to configure");
	return (await WiiDevices.wait_for_event()).wii_device;
}

async function main() {
	await wait_for_wii_devices();
	const wii_device = await pick_wii_device();
	const { mode } = await inquirer.prompt([
		{
			type: "list",
			name: "mode",
			message: "which mode do you choose?",
			choices: Object.keys(wii_device.configs),
		},
	]);
	wii_device.setConfig(mode);
	console.log(`Started ${wii_device.name} in '${mode}' mode`);
	wii_device.setup_permanent_listener();
}

main();

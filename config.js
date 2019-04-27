class Config {
	constructor(
		simulator_class,
		{ button_to_original_keycode, button_to_simulated_event_name }
	) {
		this.button_to_original_keycode = button_to_original_keycode;
		this.button_to_simulated_event_name = button_to_simulated_event_name;

		this.original_keycodes_to_button = {};
		this.simulator_class = simulator_class;

		for (let button in this.button_to_original_keycode) {
			this.original_keycodes_to_button[
				this.button_to_original_keycode[button]
			] = button;
		}
	}

	start(wiimote) {
		this.simulator = new this.simulator_class();
		wiimote.on("input", event => {
			if (event.key_code == 0) {
				return;
			}
			this.simulator.simulateEvent({
				key_name: this.button_to_simulated_event_name[
					event.button_name
				],
				direction: event.direction,
			});
		});
	}
}

module.exports = Config;

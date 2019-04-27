// from http://art.vexillium.org/posts/nodejs-gamepad-driver/content/uinput.js
// http://art.vexillium.org/posts/nodejs-gamepad-driver/

// types of events from: /usr/include/linux/input-event-codes.h

var restruct = require("restruct"),
	io = require("./io");

var uinput = {};

uinput.UI_SET_EVBIT = io._IOW(io.UINPUT_IOCTL_BASE, 100, io["int"]);
uinput.UI_SET_KEYBIT = io._IOW(io.UINPUT_IOCTL_BASE, 101, io["int"]);
uinput.UI_SET_RELBIT = io._IOW(io.UINPUT_IOCTL_BASE, 102, io["int"]);
uinput.UI_SET_ABSBIT = io._IOW(io.UINPUT_IOCTL_BASE, 103, io["int"]);
//https://github.com/torvalds/linux/blob/1fc7f56db7a7c467e46a5d2e2a009d2f337e0338/include/uapi/linux/input.h#L182
uinput.EVIOCGRAB = io._IOW("E".charCodeAt(0), 0x90, io["int"]);

// https://github.com/torvalds/linux/blob/1fc7f56db7a7c467e46a5d2e2a009d2f337e0338/include/uapi/linux/input.h#L178

uinput.EVIOCSFF = io._IOW("E".charCodeAt(0), 0x80, io["ff_effect"]);

uinput.UI_DEV_CREATE = io._IO(io.UINPUT_IOCTL_BASE, 1);
uinput.UI_DEV_DESTROY = io._IO(io.UINPUT_IOCTL_BASE, 2);

uinput.EV_SYN = 0x00;
uinput.EV_KEY = 0x01;
uinput.EV_REL = 0x02;
uinput.EV_ABS = 0x03;

uinput.BTN_MOUSE = 0x110;
uinput.BTN_LEFT = 0x110;
uinput.BTN_RIGHT = 0x111;
uinput.BTN_MIDDLE = 0x112;

uinput.BTN_MOUSE = 0x110;
uinput.BTN_LEFT = 0x110;
uinput.BTN_RIGHT = 0x111;
uinput.BTN_MIDDLE = 0x112;
uinput.BTN_SIDE = 0x113;
uinput.BTN_EXTRA = 0x114;
uinput.BTN_FORWARD = 0x115;
uinput.BTN_BACK = 0x116;
uinput.BTN_TASK = 0x117;
uinput.BTN_JOYSTICK = 0x120;
uinput.BTN_TRIGGER = 0x120;
uinput.BTN_THUMB = 0x121;
uinput.BTN_THUMB2 = 0x122;
uinput.BTN_TOP = 0x123;
uinput.BTN_TOP2 = 0x124;
uinput.BTN_PINKIE = 0x125;
uinput.BTN_BASE = 0x126;
uinput.BTN_BASE2 = 0x127;
uinput.BTN_BASE3 = 0x128;
uinput.BTN_BASE4 = 0x129;
uinput.BTN_BASE5 = 0x12a;
uinput.BTN_BASE6 = 0x12b;
uinput.BTN_DEAD = 0x12f;
uinput.BTN_GAMEPAD = 0x130;
uinput.BTN_A = 0x130;
uinput.BTN_B = 0x131;
uinput.BTN_C = 0x132;
uinput.BTN_X = 0x133;
uinput.BTN_Y = 0x134;
uinput.BTN_Z = 0x135;
uinput.BTN_TL = 0x136;
uinput.BTN_TR = 0x137;
uinput.BTN_TL2 = 0x138;
uinput.BTN_TR2 = 0x139;
uinput.BTN_SELECT = 0x13a;
uinput.BTN_START = 0x13b;
uinput.BTN_MODE = 0x13c;
uinput.BTN_THUMBL = 0x13d;
uinput.BTN_THUMBR = 0x13e;
uinput.REL_X = 0x00;
uinput.REL_Y = 0x01;
uinput.REL_WHEEL = 0x08;
uinput.ABS_X = 0x00;
uinput.ABS_Y = 0x01;
uinput.ABS_Z = 0x02;

uinput.ABS_RX = 0x03;
uinput.ABS_RY = 0x04;
uinput.ABS_RZ = 0x05;
uinput.ABS_HAT0X = 0x10;
uinput.ABS_HAT0Y = 0x11;
uinput.ABS_MISC = 0x28;

uinput.ID_BUS = 0;
uinput.BUS_USB = 0x3;

uinput.KEY_RESERVED = 0;
uinput.KEY_ESC = 1;
uinput.KEY_1 = 2;
uinput.KEY_2 = 3;
uinput.KEY_3 = 4;
uinput.KEY_4 = 5;
uinput.KEY_5 = 6;
uinput.KEY_6 = 7;
uinput.KEY_7 = 8;
uinput.KEY_8 = 9;
uinput.KEY_9 = 10;
uinput.KEY_0 = 11;
uinput.KEY_MINUS = 12;
uinput.KEY_EQUAL = 13;
uinput.KEY_BACKSPACE = 14;
uinput.KEY_TAB = 15;
uinput.KEY_Q = 16;
uinput.KEY_W = 17;
uinput.KEY_E = 18;
uinput.KEY_R = 19;
uinput.KEY_T = 20;
uinput.KEY_Y = 21;
uinput.KEY_U = 22;
uinput.KEY_I = 23;
uinput.KEY_O = 24;
uinput.KEY_P = 25;
uinput.KEY_LEFTBRACE = 26;
uinput.KEY_RIGHTBRACE = 27;
uinput.KEY_ENTER = 28;
uinput.KEY_LEFTCTRL = 29;
uinput.KEY_A = 30;
uinput.KEY_S = 31;
uinput.KEY_D = 32;
uinput.KEY_F = 33;
uinput.KEY_G = 34;
uinput.KEY_H = 35;
uinput.KEY_J = 36;
uinput.KEY_K = 37;
uinput.KEY_L = 38;
uinput.KEY_SEMICOLON = 39;
uinput.KEY_APOSTROPHE = 40;
uinput.KEY_GRAVE = 41;
uinput.KEY_LEFTSHIFT = 42;
uinput.KEY_BACKSLASH = 43;
uinput.KEY_Z = 44;
uinput.KEY_X = 45;
uinput.KEY_C = 46;
uinput.KEY_V = 47;
uinput.KEY_B = 48;
uinput.KEY_N = 49;
uinput.KEY_M = 50;
uinput.KEY_COMMA = 51;
uinput.KEY_DOT = 52;
uinput.KEY_SLASH = 53;
uinput.KEY_RIGHTSHIFT = 54;
uinput.KEY_KPASTERISK = 55;
uinput.KEY_LEFTALT = 56;
uinput.KEY_SPACE = 57;
uinput.KEY_CAPSLOCK = 58;
uinput.KEY_F1 = 59;
uinput.KEY_F2 = 60;
uinput.KEY_F3 = 61;
uinput.KEY_F4 = 62;
uinput.KEY_F5 = 63;
uinput.KEY_F6 = 64;
uinput.KEY_F7 = 65;
uinput.KEY_F8 = 66;
uinput.KEY_F9 = 67;
uinput.KEY_F10 = 68;

uinput.BTN_DPAD_UP = 0x220;
uinput.BTN_DPAD_DOWN = 0x221;
uinput.BTN_DPAD_LEFT = 0x222;
uinput.BTN_DPAD_RIGHT = 0x223;

uinput.UINPUT_MAX_NAME_SIZE = 80;

uinput.input_id = restruct
	.int16lu("bustype")
	.int16lu("vendor")
	.int16lu("product")
	.int16lu("version")
	.pad(1012);

uinput.uinput_user_dev = restruct
	.string("name", uinput.UINPUT_MAX_NAME_SIZE)
	.struct("id", uinput.input_id)
	.int32ls("absmax")
	.int32ls("absmin")
	.int32ls("absfuzz")
	.int32ls("absflat");

for (var i in uinput) {
	module.exports[i] = uinput[i];
}

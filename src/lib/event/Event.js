export default function Event() {
	this.handlers = {};
}

const getHandler = (handlers, eventName, isOnce = false) => {
	if (!handlers[eventName]) {
		handlers[eventName] = {
			isOnce,
			callbacks: [],
		};
	}
	return handlers[eventName];
};

Event.prototype.on = function (eventName, cb) {
	const _handlers = this.handlers;
	getHandler(_handlers, eventName).callbacks.push(cb);
};

Event.prototype.once = function (eventName, cb) {
	const _handlers = this.handlers;
	getHandler(_handlers, eventName, true).callbacks.push(cb);
};

Event.prototype.off = function (eventName) {
	this.handlers[eventName] && delete this.handlers[eventName];
};

Event.prototype.emit = function (eventName, ...args) {
	const _handlers = this.handlers;
	const _handler = getHandler(_handlers, eventName);
	if (!_handler) return;
	const { isOnce, callbacks } = _handler;
	callbacks.forEach(cb => cb.call(cb, ...args));
	if (isOnce) {
		this.off(eventName);
	}
};

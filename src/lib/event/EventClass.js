export default class Event {
	handlers = [];
	constructor() {}

	_getHanler(eventName, isOnce = false) {
		if (!this.handlers[eventName]) {
			this.handlers[eventName] = {
				isOnce,
				callbacks: [],
			};
		}
		return this.handlers[eventName];
	}

	on(eventName, cb) {
		const { callbacks } = this._getHanler(eventName);
		callbacks.push(cb);
	}

	once(eventName, cb) {
		const { callbacks } = this._getHanler(eventName, true);
		callbacks.push(cb);
	}

	emit(eventName, ...args) {
		const { isOnce, callbacks } = this._getHanler(eventName);
		callbacks.forEach(cb => cb.call(cb, ...args));
		if (isOnce) {
			this.off(eventName);
		}
	}

	off(eventName) {
		this.handlers[eventName] && delete this.handlers[eventName];
	}
}

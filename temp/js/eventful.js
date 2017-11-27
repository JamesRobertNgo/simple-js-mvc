/* exported Eventful */

/** Super class for objects with event management. */
class Eventful {

	/** Initialize with required properties and methods. */
	constructor() {

		// Add properties.
		Eventful.extend(this);
	}
}

Eventful.extend = (eventfulObject) => {

	// removeIf(production)
	// Check for requirements.
	const throwMessagePrefix = 'Eventful class. extend(eventfulObject) class method.';
	if (!eventfulObject || typeof eventfulObject !== 'object') {
		throw `${throwMessagePrefix} Argument 'eventfulObject' cannot be null nor undefined, and must be of type object.`;
	}
	// endRemoveIf(production)

	const events = {};

	/**
	 * Add event handlers for an event name. Not enumerable.
	 * @param {string}     eventName
	 * @prarm {[function]} eventHandlers
	 */
	Object.defineProperty(eventfulObject, 'addEventHandlers', {
		configurable: false,
		enumerable: false,
		value: (eventName, eventHandlers) => {

			// removeIf(production)
			// Check for requirements.
			const throwMessagePrefix = 'Eventful instance. addEventHandlers(eventName, eventHandlers) instance method.';
			if (!eventName || typeof eventName !== 'string') {
				throw `${throwMessagePrefix} Argument 'eventName' cannot be null nor undefined, and must be of type string.`;
			}
			if (!eventHandlers || !Array.isArray(eventHandlers) || eventHandlers.length === 0 || !eventHandlers.every((eventHandler) => typeof eventHandler !== 'function')) {
				throw `${throwMessagePrefix} Argument 'eventHandlers' cannot be null nor undefined, must be of type array of functions, and must have atleast one element.`;
			}
			// endRemoveIf(production)

			// Create new event.
			if (!events[eventName]) {
				events[eventName] = [];
			}

			// Add event handlers.
			for (const eventHandler of eventHandlers) {
				events[eventName].push(eventHandler);
			}

			// Allows chaining
			return eventfulObject;
		},
		writable: false
	});

	/**
	 * Add an event handler for an event name. Not enumerable.
	 * @param {string}   eventName
	 * @prarm {function} eventHandler
	 */
	Object.defineProperty(eventfulObject, 'addEventHandler', {
		configurable: false,
		enumerable: false,
		value: (eventName, eventHandler) => {

			// removeIf(production)
			// Check for requirements.
			const throwMessagePrefix = 'Eventful instance. addEventHandler(eventName, eventHandler) instance method.';
			if (!eventName || typeof eventName !== 'string') {
				throw `${throwMessagePrefix} Argument 'eventName' cannot be null nor undefined, and must be of type string.`;
			}
			if (!eventHandler || typeof eventName !== 'function') {
				throw `${throwMessagePrefix} Argument 'eventHandler' cannot be null nor undefined, and must be of type function.`;
			}
			// endRemoveIf(production)

			// Allows chaining
			return eventfulObject.addEventHandlers(eventName, [eventHandler]);
		},
		writable: false
	});

	/**
	 * Remove event handlers for an event name. Not enumerable.
	 * @param {string}     eventName
	 * @prarm {[function]} eventHandlers - Optional.
	 */
	Object.defineProperty(eventfulObject, 'removeEventHandlers', {
		configurable: false,
		enumerable: false,
		value: (eventName, eventHandlers) => {

			// removeIf(production)
			// Check for requirements.
			const throwMessagePrefix = 'Eventful instance. removeEventHandlers(eventName, eventHandlers) instance method.';
			if (!eventName || typeof eventName !== 'string') {
				throw `${throwMessagePrefix} Argument 'eventName' cannot be null nor undefined, and must be of type string.`;
			}
			if (eventHandlers && (!Array.isArray(eventHandlers) || eventHandlers.length === 0 || !eventHandlers.every((eventHandler) => typeof eventHandler !== 'function'))) {
				throw `${throwMessagePrefix} Argument 'eventHandlers' must be of type array of functions, and must have atleast one element.`;
			}
			// endRemoveIf(production)

			if (events[eventName]) {
				if (eventHandlers) { // Remove specified event handlers.
					for (let i = 0, l = events[eventName].length; i < l; i++) {
						if (eventHandlers.indexOf(events[eventName][i]) != -1) {
							events[eventName][i].splice(i, 1);
							break;
						}
					}
				} else { // Empty entire event.
					events[eventName] = [];
				}
			}

			// Allows chaining.
			return eventfulObject;
		},
		writable: false
	});

	/**
	 * Remove an event handler for an event name. Not enumerable.
	 * @param {string}   eventName
	 * @prarm {function} eventHandler
	 */
	Object.defineProperty(eventfulObject, 'removeEventHandler', {
		configurable: false,
		enumerable: false,
		value: (eventName, eventHandler) => {

			// removeIf(production)
			// Check for requirements.
			const throwMessagePrefix = 'Eventful instance. removeEventHandler(eventName, eventHandler) instance method.';
			if (!eventName || typeof eventName !== 'string') {
				throw `${throwMessagePrefix} Argument 'eventName' cannot be null nor undefined, and must be of type string.`;
			}
			if (!eventHandler || typeof eventHandler !== 'function') {
				throw `${throwMessagePrefix} Argument 'eventHandler' cannot be null nor undefined, and must be of type function.`;
			}
			// endRemoveIf(production)

			return eventfulObject.removeEventHandlers(eventName, [eventHandler]);
		},
		writable: false
	});

	/**
	 * Trigger events. Not enumerable.
	 * @param {[string]} eventNames
	 * @prarm {[any]}    args       - Arguments to be passed to the event's event handlers.
	 */
	Object.defineProperty(eventfulObject, 'triggerEvents', {
		configurable: false,
		enumerable: false,
		value: (eventNames, ...args) => {

			// removeIf(production)
			// Check for requirements.
			const throwMessagePrefix = 'Eventful instance. triggerEvents(eventNames, ...args) instance method.';
			if (!eventNames || !Array.isArray(eventNames) || eventNames.length === 0 || eventNames.every((eventName) => typeof eventName !== 'string')) {
				throw `${throwMessagePrefix} Argument 'eventNames' cannot be null nor undefined, must be of type array of strings, and must have atleast one element.`;
			}
			// endRemoveIf(production)

			for (const eventName of eventNames) {
				if (events[eventName]) {
					for (const eventHandler of events[eventName]) {
						eventHandler(...args);
					}
				}
			}

			// Allows chaining.
			return eventfulObject;
		},
		writable: false
	});

	/**
	 * Trigger an event. A convenient method. Not enumerable.
	 * @param {string} eventName
	 * @prarm {[any]}    args       - Arguments to be passed to the event's event handlers.
	 */
	Object.defineProperty(eventfulObject, 'triggerEvent', {
		configurable: false,
		enumerable: false,
		value: (eventName, ...args) => {

			// removeIf(production)
			// Check for requirements.
			const throwMessagePrefix = 'Eventful instance. triggerEvent(eventName, ...args) instance method.';
			if (!eventName || typeof eventName !== 'string') {
				throw `${throwMessagePrefix} Argument 'eventName' cannot be null nor undefined, and must be of type strings.`;
			}
			// endRemoveIf(production)

			// Allows chaining.
			return eventfulObject.triggerEvents([eventName], ...args);
		},
		writable: false
	});
};

Eventful.reservedPropertyNames = ['addEventHandler', 'addEventHandlers', 'removeEventHandler', 'removeEventHandlers', 'triggerEvent', 'triggerEvents'];
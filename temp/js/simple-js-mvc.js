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

/* global Eventful */
/* exported Model */

/** Model represents data. */
class Model extends Eventful {

	/**
	 * Initialize Model instance.
	 * @param {Object} initialProperties - Optional.
	 */
	constructor(initialProperties) {
		super();
		
		// Add properties.
		Model.extend(this);
		
		// Add initial properties.
		for (const k in initialProperties) {
			this.addManagedProperty(k, initialProperties[k]);
		}
	}
}

Model.extend = (modelObject) => {
	// removeIf(production)
	// Check for requirements.
	const throwMessagePrefix = 'Model class. extend(modelObject) class method.';
	if (!modelObject || typeof modelObject !== 'object') {
		throw `${throwMessagePrefix} Argument 'modelObject' cannot be null nor undefined, and must be of type object.`;
	}
	// endRemoveIf(production)
	
	const managedProperties = {};
		
	/**
	 * Adds managed property.
	 * @param {string} propertyName
	 * @param {any}    propertyValue - Optional.
	 */
	Object.defineProperty(modelObject, 'addManagedProperty', {
		configurable: false,
		enumerable: false,
		value: (propertyName, propertyValue) => {
			
			// removeIf(production)
			// Check for requirements.
			const throwMessagePrefix = 'Model instance. addManagedProperty(propertyName, propertyValue) instance method.';
			if (!propertyName || typeof propertyName !== 'string') {
				throw `${throwMessagePrefix} Argument 'propertyName' cannot be null nor undefined, and must be of type string.`;
			}
			if (Model.reservedPropertyNames.indexOf(propertyName) != -1) {
				throw `${throwMessagePrefix} The value for the argument 'propertyName' is a reserved property name.`;
			}
			// endRemoveIf(production)
				
			// Trigger events.
			modelObject.triggerEvent('willAddManagedProperty', propertyName, managedProperties[propertyName])
				.triggerEvent(`willAddManagedProperty:${propertyName}`, managedProperties[propertyName]);
			
			// Add managed property.
			Object.defineProperty(modelObject, propertyName, {
				configurable: true,
				enumerable: true,
				get: () => {
					modelObject.triggerEvent('get', propertyName, managedProperties[propertyName])
						.triggerEvent(`get:${propertyName}`, managedProperties[propertyName]);
					
					return managedProperties[propertyName];
				},
				set: (newPropertyValue) => {
					const oldPropertyValue = managedProperties[propertyName];
					
					// Trigger events.
					if (oldPropertyValue != newPropertyValue) {
						modelObject.triggerEvent('willChange', propertyName, managedProperties[propertyName])
							.triggerEvent(`willChange:${propertyName}`, managedProperties[propertyName]);
					}
					modelObject.triggerEvent('willSet', propertyName, managedProperties[propertyName])
						.triggerEvent(`willSet:${propertyName}`, managedProperties[propertyName]);
					
					// Set value.
					managedProperties[propertyName] = newPropertyValue;
					
					// Trigger events.
					modelObject.triggerEvents(['didSet', 'set'], propertyName, managedProperties[propertyName])
						.triggerEvents([`didSet:${propertyName}`, `set:${propertyName}`], managedProperties[propertyName]);
					if (oldPropertyValue != newPropertyValue) {
						modelObject.trigger(['change', 'didChange'], propertyName, managedProperties[propertyName])
							.trigger([`change:${propertyName}`, `didChange:${propertyName}`], managedProperties[propertyName]);
					}
				}
			});
			
			// Trigger events.
			modelObject.triggerEvents(['addManagedProperty', 'didAddManagedProperty'], propertyName, managedProperties[propertyName])
				.triggerEvents([`addManagedProperty:${propertyName}`, `didAddManagedProperty:${propertyName}`], managedProperties[propertyName]);
			
			// Set value.
			modelObject[propertyName] = propertyValue;
			
			// Allows chaining
			return modelObject;
		},
		writable: false
	});
	
	/** Clear properties by setting them to null. */
	Object.defineProperty(modelObject, 'clearProperties', {
		configurable: false,
		enumerable: false,
		value: () => {
			
			// Trigger events.
			modelObject.triggerEvent('willClearProperties');
			
			// Clear properties.
			for (const propertyName of Object.keys(managedProperties)) {
				modelObject[propertyName] = null;
			}
			
			// Trigger events.
			modelObject.triggerEvent(['clearProperties', 'didClearProperties']);
			
			// Allows chaining
			return modelObject;
		},
		writable: false
	});
	
	/**
	 * Remove managed property.
	 * @param {string} propertyName
	 */
	Object.defineProperty(modelObject, 'removeManagedProperty', {
		configurable: false,
		enumerable: false,
		value: (propertyName) => {
		
			// removeIf(production)
			// Check for requirements.
			const throwMessagePrefix = 'Model instance. addManagedProperty(propertyName, propertyValue) instance method.';
			if (!propertyName || typeof propertyName !== 'string') {
				throw `${throwMessagePrefix} Argument 'propertyName' cannot be null nor undefined, and must be of type string.`;
			}
			if (Model.reservedPropertyNames.indexOf(propertyName) != -1) {
				throw `${throwMessagePrefix} The value for the argument 'propertyName' is a reserved property name.`;
			}
			// endRemoveIf(production)
			
			// Trigger events.
			modelObject.triggerEvent('willRemoveManagedProperty', propertyName, managedProperties[propertyName])
				.triggerEvent(`willRemove:${propertyName}`, managedProperties[propertyName]);
			
			// Remove managed property.
			delete modelObject[propertyName];
			delete managedProperties[propertyName];
			
			// Trigger events.
			modelObject.triggerEvents(['removeManagedProperty', 'didRemoveManagedProperty'], propertyName, managedProperties[propertyName])
				.triggerEvents([`removeManagedProperty:${propertyName}`, `didRemove:${propertyName}`], managedProperties[propertyName]);
			
			// Allows chaining
			return modelObject;
		},
		writable: false
	});
};

Model.reservedPropertyNames = Eventful.concat(['addManagedProperty', 'clearProperties', 'removeManagedProperty']);


/* global document, Eventful, HTMLElement Model */
/* exported View */

class View {
	constructor() {
		// removeIf(production)
		// Check for requirements.
		throw 'View object. This class should not be instantiated.';
		// endRemoveIf(production)
	}
}

/**
 * Creates new HTML element based on view configurations.
 * @param {object}             viewConfig
 * @param {boolean}            viewConfig.isBlock       - Optional. Default to true.
 * @param {function}           viewConfig.postScript    - Optional.
 * @param {function}           viewConfig.preScript     - Optional.
 * @param {string:function}    viewConfig.eventHandlers - Optional. Key is the event name, value is the event handler.
 * @param {string:any}         viewConfig.properties    - Optional. Key is the property name, value is the property value.
 * @param {string|HTMLElement} viewConfig.htmlString
 */
View.factory = (viewConfig) => {
	
	// removeIf(production)
	// Check for requirements.
	const throwMessagePrefix = 'View class. factory(viewConfig) class method.';
	if (!viewConfig || typeof viewConfig !== 'object') {
		throw `${throwMessagePrefix} Argument 'viewConfig' cannot be null nor undefined, and must be of type object.`;
	}
	if (viewConfig.preScript && typeof viewConfig.preScript !== 'function') {
		throw `${throwMessagePrefix} Argument 'viewConfig.preScript' must be of type function.`;
	}
	if (viewConfig.isBlock !== undefined && typeof viewConfig.isBlock !== 'boolean') {
		throw `${throwMessagePrefix} Argument 'viewConfig.isBlock' must be of type boolean.`;
	}
	if (!viewConfig.htmlString || (typeof viewConfig.htmlString !== 'string' && !(typeof HTMLElement === 'object' ? viewConfig.htmlString instanceof HTMLElement : typeof viewConfig.htmlString === 'object' && viewConfig.htmlString !== null && viewConfig.htmlString.nodeType === 1 && typeof viewConfig.htmlString.nodeName === 'string'))) {
		throw `${throwMessagePrefix} Argument 'viewConfig.htmlString' cannot be null nor undefined, and must be of type string.`;
	}
	if (!viewConfig.postScript && typeof viewConfig.postScript !== 'function') {
		throw `${throwMessagePrefix} Argument 'viewConfig.postScript' must be of type function.`;
	}
	// endRemoveIf(production)
	
	let html;
	return Promise.resolve()
		.then(() => viewConfig.preScript())
		.then(() => {
		
			// Create element.
			html = document.createElement(viewConfig.isBlock === false ? 'span' : 'div');
			if (typeof viewConfig.htmlString === 'string') {
				html.innerHTML = viewConfig.htmlString;
			} else {
				html.appendChild(viewConfig.htmlString);
			}
			
			// Make element eventful.
			Eventful.extend(html);
			if (viewConfig.eventHandlers) {
				for (const k in viewConfig.eventHandlers) {
					this.addEventHandler(k, viewConfig.eventHandlers[k]);
				}
			}
			
			// Add managed properties.
			Model.extend(html);
			if (viewConfig.properties) {
				for (const k in viewConfig.properties) {
					this.addManagedProperty(k, viewConfig.properties[k]);
				}
			}
		})
		.then(() => viewConfig.postScript(html))
		.then(() => html);
};
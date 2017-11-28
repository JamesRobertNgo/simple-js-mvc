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


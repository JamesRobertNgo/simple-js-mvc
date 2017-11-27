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
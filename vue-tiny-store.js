/*! Copyright (c) 2022 Emanuel Capurro
 * Licensed Under MIT (http://opensource.org/licenses/MIT)
 *
 * Vue Tiny Store - version@1.0.0
 *
 */
(function() {
    const VueTinyStore = {
        install(Vue, opt) {
            if (opt.debug) console.info('[Vue Tiny Store]: In Debug Mode - Init: ' + new Date().toTimeString().slice(0, 8) + "hs");

            let stores = {}
            let state = {}

            for (let i = 0; i < opt.stores.length; i++) {

                if (opt.stores[i].name === undefined) console.warn("[Vue Tiny Store]: please add a Store Name", opt.stores[i]);

                // Make a global Stores
                stores[opt.stores[i].name] = Vue.observable(opt.stores[i]);

                // Make a global state
                if (opt.stores[i].state !== undefined) state[opt.stores[i].name] = Vue.observable(opt.stores[i].state);

                // Remove the name
                delete stores[opt.stores[i].name].name;
            }

            if (opt.debug) {
                console.info('[Vue Tiny Store]: Stores Created');
            }

            // Acess to store, state and snapshot 
            Vue.prototype.$state = store => {
                try {
                    return stores[store].state
                } catch (err) {
                    console.error("[Vue Tiny Store]: the " + store + " store doesn't exist");
                }
            }

            Vue.prototype.$action = (action, ...args) => {
                let colon = action.search(':');
                let store = action.substr(0, colon);
                let event = action.substr(colon + 1, action.length)

                if (stores[store] === undefined) return console.error("[Vue Tiny Store]: the " + store + " store doesn't exist");

                // Trigger the store
                try {
                    // stores[store][event](...args);
                    return stores[store][event](...args);
                } catch (err) {
                    console.error("[Vue Tiny Store]: the " + event + " event doesn't exist");
                }

                if (opt.debug) {
                    if (args === undefined)
                        console.info("[Vue Tiny Store]: Trigger " + action);
                    else
                        console.info("[Vue Tiny Store]: Trigger " + action + " -> " + args);

                }
            };

            Vue.prototype.$snapshot = () => {
                if (opt.debug) {
                    console.info('[Vue Tiny Store]: Stores Snapshot');
                    console.info(stores)
                }
            }
        }
    }

    // If support node / ES6 module
    if (typeof module === 'object' && module.exports) {
        module.exports = VueTinyStore
    }
    // if script loaded by script tag in HTML file
    else if (typeof window !== undefined) {
        return window.VueTinyStore = VueTinyStore
    }
})()
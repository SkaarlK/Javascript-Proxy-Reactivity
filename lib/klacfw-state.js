import Dep from "./klacfw-dep.js";

class State {
    data = {}
    computed = {}

    constructor(obj = {}, computedObj = {}) {
        this.data = obj;

        this.defineProperties(this.data, this.createDataStrategy(), obj);
        this.defineProperties(this.computed, this.createComputedStrategy(), computedObj);
        
        this.data = {...this.data, ...computedObj }
        
        return new Proxy(this.data, {
            set: (target, property, value) => {
                if (typeof value === 'function') {
                    this.computed[property] = value;
                    this.addProperty(this.computed, property, value, this.createComputedStrategy());
                    this.data[property] = this.computed[property];
                } else {
                    this.addProperty(target, property, value, this.createDataStrategy());
                }
                return true;
            }
        });
    }

    defineProperties(obj, strategy, originalObj) {
        Object.keys(originalObj).forEach(key => {
            this.defineReactiveProperty(obj, key, originalObj[key], strategy);
        });
    }

    addProperty(obj, key, value, strategy) {
        if (!obj.hasOwnProperty(key)) {
            this.defineReactiveProperty(obj, key, value, strategy);
        } else {
            obj[key] = value;
        }
    }
    

    defineReactiveProperty(obj, key, value, strategy) {
        const dep = new Dep();
        const { get, set } = strategy(obj, key, dep);
        Object.defineProperty(obj, key, { get, set });

        // Only set the value directly if it's not a computed property
        if (!this.computed.hasOwnProperty(key)) {
            obj[key] = value;
        }
    }

    createDataStrategy() {
        return (obj, key, dep) => {
            let internalValue;
            return {
                get: () => {
                    dep.depend();
                    return internalValue;
                },
                set: (newVal) => {
                    internalValue = newVal;
                    dep.notify();
                }
            };
        };
    }

    createComputedStrategy() {
        return (obj, key, dep) => {
            const computeFn = obj[key];
            return {
                get: () => this.computeAndUpdateValue(computeFn, dep),
                set: () => {
                    console.warn(`Cannot set computed property "${key}".`);
                }
            };
        };
    }

    computeAndUpdateValue(computeFn, dep) {
        const updatedValue = computeFn.call(this.data);
        Dep.target = () => updatedValue;
        dep.depend();
        Dep.target = null;
        return updatedValue;
    }
}

export default State

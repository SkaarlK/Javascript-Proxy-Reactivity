class Dep {
    subscribers = [];

    depend() {
        if (target && !this.subscribers.includes(target)) {
            this.subscribers.push(target)
        }
    }

    notify() {
        this.subscribers.forEach(sub => sub())
    }

}

const dep = new Dep()

const target = () => total = price * quantity

let price = 5,
    quantity = 2,
    total = 0


dep.depend();
target();

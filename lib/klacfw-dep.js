class Dep {
    subscribers = []

    depend() {
        if (Dep.target && !this.subscribers.includes(Dep.target)) {
            this.subscribers.push(Dep.target);
        }
    }

    notify() {
        this.subscribers.forEach(sub => sub());
    }
}

export default Dep
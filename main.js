import { logReactivity } from "./lib/logger.js";
import State from "./lib/klacfw-state.js";

const state = new State();

state.price = 5
state.quantity = 5
state.total = () => state.price * state.quantity
state.totalWithTaxes = () => state.total() * 1.25

logReactivity(state);

state.price = 5
state.quantity = 100

logReactivity(state);

state.price = 1000
state.quantity = 100

logReactivity(state);

state.price = 1
state.quantity = 1

logReactivity(state);
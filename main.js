import { logState } from "./lib/logger.js";
import State from "./lib/klacfw-state.js";

const state = new State();

state.price = 5
state.quantity = 5
state.total = () => state.price * state.quantity
state.totalWithTaxes = () => state.total() * state.price

logState(state);

state.price = 5
state.quantity = 100

logState(state);

state.price = 1000
state.quantity = 100

logState(state);

state.price = 1
state.quantity = 1

logState(state);
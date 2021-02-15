import { LitState, stateVar } from '@app/lit-state.js';


class ParentState extends LitState {
    @stateVar() childState1;
    @stateVar() childState2;
}


class ChildState extends LitState {
    @stateVar() counter;
}


export const parentState = new ParentState();
const childState1 = new ChildState();
const childState2 = new ChildState();

childState1.counter = 1;
childState2.counter = 1000;

parentState.childState1 = childState1;
parentState.childState2 = childState2;

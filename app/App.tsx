import * as React from "react";
import { Component } from "react";
import Inventory from "./Inventory";
import { Provider } from 'react-redux'
import store from './store/index'
import { toggleMenu, setRecipes, setInventory, setWorkbench } from "./store/action";

export class App extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    initialize() {
        window.addEventListener('message', function(event) {
            switch (event.data.event) {
                case "toggleMenu":
                    store.dispatch(toggleMenu(event.data.value))
                    store.dispatch(setWorkbench(event.data.workbench || ""))
                    break;
                case "setRecipes":
                    store.dispatch(setRecipes(event.data.value))
                    break;
                case "setInventory":
                    store.dispatch(setInventory(event.data.value))
                    break;
            }
        })
    }

    componentDidMount() {
        this.initialize()
    }

    render() {
        return <Provider store={store}>
            <div id="viewport">
                <Inventory />
            </div>
        </Provider>
    }
}
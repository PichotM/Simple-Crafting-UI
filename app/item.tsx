import * as React from 'react'
import { Component } from 'react'
import { connect } from 'react-redux'
import { selectRecipe } from './store/action'

class Item extends Component<any, any> {

    private item: HTMLElement = undefined

    constructor(props) {
        super(props)
    }

    onClick() {
        this.props.selectRecipe(this.props.recipes.indexOf(this.props.data))
    }

    canCraftRecipe() {
        if (this.props.data.workbench && this.props.data.workbench !== this.props.workbench) return false;
        
        for (let index = 0; index < this.props.data.ingredients.length; index++) {
            const e = this.props.data.ingredients[index];
            if (!this.props.inventory[e.name] || this.props.inventory[e.name] < e.amount) {
                return false
            }
        }

        return true
    }

    render() {
        return <div className={'item ' + (this.canCraftRecipe() ? '' : 'blocked')} onMouseDown={this.onClick.bind(this)} ref={item => (this.item = item)} data-id={Math.random()}>
            <div className="item-desc">
                <p className="name">{this.props.data.name}</p>
            </div>
            <div className="item-right">+</div>
        </div>
    }
}

const mapStateToProps = state => ({
    inventory : state.craft.inventory,
    recipes : state.craft.recipes,
    workbench : state.craft.workbench
})

export default connect(mapStateToProps, { selectRecipe: selectRecipe })(Item);
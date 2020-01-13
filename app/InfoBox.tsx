import * as React from 'react'
import { Component } from 'react'
import { connect } from 'react-redux';
import { selectRecipe, toggleMenu } from './store/action';

class InfoBox extends Component<any, any> {

    constructor(props) {
        super(props)
    }

    private onClickCraft(e) {
        fetch('http://crafting/craftRecipe', { method: 'POST', body: JSON.stringify({ id : this.props.recipe }) })
        this.props.toggleMenu(false)
    }

    private onClickCose() {
        this.props.selectRecipe()
    }

    get ingredientList() {
        const ingredients: any[] = this.props.recipeInfo.ingredients || []
        return ingredients.map((e) => {
            const itemAmount = this.props.inventory[e.name] || 0
            return <li className="ingredient">{e.name} ({Math.min(itemAmount, e.amount)}/{e.amount})</li>
        })
    }

    render() {
        return <div className="hint-list">
        <div className="item-list-title">
            <div className="title">{this.props.recipeInfo.name}</div>
        </div>
        <ul className="ingredients-list">
            {this.ingredientList}
        </ul>
        <div className="hint-buttons">
            <div className="hint-button" onClick={this.onClickCraft.bind(this)}>Fabriquer</div>
            <div className="hint-button" onClick={this.onClickCose.bind(this)}>Fermer</div>
        </div>
    </div>
    }
}

const mapStateToProps = state => ({
    recipe: state.craft.recipe,
    recipeInfo : state.craft.recipeInfo,
    inventory: state.craft.inventory
})

export default connect(mapStateToProps, { selectRecipe: selectRecipe, toggleMenu: toggleMenu })(InfoBox);
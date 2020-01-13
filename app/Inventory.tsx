import * as React from 'react'
import { Component } from 'react'
import RecipeList from './RecipeList'
import InfoBox from './InfoBox'
import { setRecipes, toggleMenu } from './store/action'
import { connect } from 'react-redux'

class Inventory extends Component<any, any> {
    private keydownCB: (KeyboardEvent) => void
    private searchRef;

    constructor(props) {
        super(props)

        this.state = {}

        this.searchRef = React.createRef();
    }

    componentDidMount() {
        this.keydownCB = (e: KeyboardEvent) => {
            if (e.key === "Tab" || e.key === "Escape") {
                this.props.toggleMenu(false)
                fetch("http://crafting/closeMenu", { method: "POST", body: "{}" })
            }
        }
        document.addEventListener('keydown', this.keydownCB)
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.keydownCB)
    }

    get show() {
        return this.props.open ? '' : 'hide'
    }

    private onClickSearch() {
        const recipes = this.props.recipes
        const searchValue = this.searchRef.current.value

        const newRecipes = searchValue ? recipes.filter((e: any) => e.name && e.name.toLowerCase().includes(searchValue) ) : recipes
        this.setState({ recipes : newRecipes })
    }

    render() {
        const recipes = this.state.recipes ? this.state.recipes : this.props.recipes
        return (
            <div id="inventory" className={this.show}>
                <div className="inventory-list">
                    <div className="item-list-title">
                        <div className="title">Crafting</div>
                    </div>
                    <div className="item-list-search">
                        <input className="searchInput" placeholder="" ref={this.searchRef}></input>
                        <button className="searchButton" onClick={this.onClickSearch.bind(this)}>Rechercher</button>
                    </div>
                    <div className="item-list-title">
                        <div className="title">Recettes</div>
                    </div>
                    <RecipeList items={recipes} />
                    <div className="item-list-title">
                        <div className="title"></div>
                    </div>
                </div>
                {this.props.recipe !== undefined && <InfoBox recipe={this.props.recipe} />}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    recipes: state.craft.recipes,
    recipe : state.craft.recipe,
    open : state.craft.open
})

export default connect(mapStateToProps, { setRecipes: setRecipes, toggleMenu: toggleMenu })(Inventory);
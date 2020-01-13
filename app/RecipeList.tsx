import * as React from 'react'
import { Component } from 'react'
import Item from './item'
import { Scrollbars } from 'react-custom-scrollbars'
import { connect } from 'react-redux'

class RecipeList extends Component<any, any> {
    private list: any

    constructor(props) {
        super(props)
    }

    get items() {
        return this.props.items.map((item, id) => {
            if (this.canSeeRecipe(item))
                return <Item data={item} key={id} />
        })
    }

    canSeeRecipe(recipeData) {
        if (recipeData.workbench && recipeData.workbench !== this.props.workbench) return false;
        return true
    }

    scroll({ style, ...props }) {
        return (
            <div
                style={{
                    ...style,
                    position: 'absolute',
                    right: '0',
                    backgroundColor: 'rgba(255, 255, 255, 0.2)'
                }}
                {...props}
            />
        )
    }

    render() {
        return (
            <div
                className={'item-list'}
                ref={list => this.list = list}
            >
                <Scrollbars renderThumbVertical={this.scroll}>
                    <ul>{this.items}</ul>
                </Scrollbars>
            </div>
        )
    }
}

const mapStateToProps = state => ({ workbench : state.craft.workbench })
export default connect(mapStateToProps, {})(RecipeList);
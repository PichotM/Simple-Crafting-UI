import { SET_RECIPES, SELECT_RECIPE, TOGGLE_MENU, SET_INVENTORY, SET_WORKBENCH } from './action'

const defaultEditorState = {
    recipes : [
        { name : "Trousse de soin", ingredients : [] },
        { name : "Bandage", ingredients : []  },
    ],
    recipeInfo : {},
    open : false,
    inventory : {},
    workbench : ''
}

const editorReducer = (state = defaultEditorState, action) => {
  switch (action.type) {
    case SET_RECIPES:
        return { ...state, recipes: action.payload };
    case SELECT_RECIPE:
        return { ...state, recipe: action.payload, recipeInfo : state.recipes[action.payload] };
    case TOGGLE_MENU:
        return { ...state, open: action.payload };
    case SET_INVENTORY:
        return { ...state, inventory: action.payload };
    case SET_WORKBENCH:
        return { ...state, workbench: action.payload };
    default:
      return state
  }
}

export default editorReducer
// action types
export const SET_RECIPES = 'SET_RECIPES'
export const SELECT_RECIPE = 'SELECT_RECIPE'
export const TOGGLE_MENU = 'TOGGLE_MENU'
export const SET_INVENTORY = 'SET_INVENTORY'
export const SET_WORKBENCH = 'SET_WORKBENCH'

// action creators
export const setRecipes = update => ({
  type: SET_RECIPES,
  payload: update,
})

export const selectRecipe = update => ({
  type: SELECT_RECIPE,
  payload: update,
})

export const toggleMenu = update => ({
  type: TOGGLE_MENU,
  payload: update
})

export const setInventory = update => ({
  type: SET_INVENTORY,
  payload: update
})

export const setWorkbench = update => ({
  type: SET_WORKBENCH,
  payload: update
})
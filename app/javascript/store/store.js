import { createStore } from "redux";
import { GET_RECIPE, GET_RECIPES, GET_USER } from "./actions/actions";

const initialState = {
  users: [],
  recipes: []
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_RECIPES:
      return {
        ...state,
        [action.name]: action.data
      };
    case GET_RECIPE:
      return {
        ...state,
        [action.name]: action.data
      };
    case GET_USER:
      return {
        ...state,
        [action.name]: action.data
      };
    default:
      return state;
  }
}

export default function configureStore() {
  const store = createStore(rootReducer, initialState);
  return store;
}

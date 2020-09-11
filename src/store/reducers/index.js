import { CONST } from "../constants/constants";

export const initialState = {
  trendings: [],
  currencies: [],
  cryptoCharts: [],
  cryptoDetails: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CONST.SET_CURRENCIES:
      return {
        ...state,
        trendings: action.trendings,
        currencies: action.currencies,
      };
    case CONST.SET_CHARTS_DETAILS:
      return {
        ...state,
        cryptoCharts: action.charts,
        cryptoDetails: action.details,
      };
    default:
      return state;
  }
};

export default reducer;

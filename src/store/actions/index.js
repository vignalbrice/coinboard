import axios from "axios";
import { CONST } from "../constants/constants";

export const getChartsAndDetails = (dispatch, id) => {
  axios
    .all([
      axios.get(`${CONST.API_URL}/currency_details/${id}`),
      axios.get(`${CONST.API_URL}/currency_marketChart/${id}`),
    ])
    .then((response) => {
      dispatch({
        type: CONST.SET_CHARTS_DETAILS,
        charts: [response[0].data],
        details: response[1].data,
      });
    })
    .catch((error) => {
      dispatch(error);
    });
};

export const getTrendsAndCurrencies = (dispatch) => {
  axios
    .get(`${CONST.API_URL}/all_currencies`)
    .then((response) => {
      dispatch({
        type: CONST.SET_CHARTS_DETAILS,
        trendings: response.data,
        currenices: response.data,
      });
    })
    .catch((error) => {
      dispatch(error);
    });
};

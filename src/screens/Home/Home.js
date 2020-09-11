import React from "react";
import axios from "axios";
import { CONST } from "../../store/constants/constants";
import ModalDetails from "../../components/Modal/ModalDetails";
import Pagination from "../../components/Pagination/Pagination";
import TrendingTable from "../../components/TrendingTable/TrendingTable";
import CurrencyCard from "../../components/CurrencyCard/CurrencyCard";

const Home = ({
  trending,
  allCoins,
  setCharts,
  charts,
  setDetails,
  details,
}) => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [modalShow, setModalShow] = React.useState(false);

  const itemPerPage = 20;

  // Logic for displaying current items
  const indexOfLastTodo = currentPage * itemPerPage;
  const indexOfFirstTodo = indexOfLastTodo - itemPerPage;
  const currentCoins = allCoins.slice(indexOfFirstTodo, indexOfLastTodo);

  // Logic for displaying page numbers
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(allCoins.length / itemPerPage); i++) {
    pageNumbers.push(i);
  }
  const handleClick = (e) => {
    setCurrentPage(e.target.id);
  };

  const handleClickDetails = (id) => {
    axios
      .all([
        axios.get(`${CONST.API_URL}/currency_details/${id}`),
        axios.get(`${CONST.API_URL}/currency_marketChart/${id}`),
      ])
      .then((response) => {
        setDetails([response[0].data]);
        setCharts(response[1].data);
        setModalShow(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const truncateDecimal = (number) => {
    var with3Decimals = parseFloat(number).toFixed(3);
    return with3Decimals;
  };
  const truncateOneDecimal = (number) => {
    var with1Decimals = parseFloat(number).toFixed(2);
    return with1Decimals;
  };

  console.log(details);
  return (
    <div className="home">
      <div className="home_header">
        <p>Stay on the good side of the coins with CoinBoard</p>
      </div>
      <div className="container">
        <div className="row justify-content-center">
          <TrendingTable trending={trending} />
          <div className="w-100">
            <div className="card card_home">
              <p className="card_title">All coins</p>
              <div className="card_content">
                <p>Name</p>
                <p>Current price</p>
                <p>Lowest / Hightest 24h</p>
                <p>Price Change / % Change</p>
              </div>
            </div>
          </div>
          <CurrencyCard
            currentCoins={currentCoins}
            truncateDecimal={truncateDecimal}
            truncateOneDecimal={truncateOneDecimal}
            handleClickDetails={handleClickDetails}
          />
          <Pagination handleClick={handleClick} pageNumbers={pageNumbers} />
          <ModalDetails
            details={details}
            charts={charts}
            modalShow={modalShow}
            setModalShow={setModalShow}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;

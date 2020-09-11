import React from "react";
import axios from "axios";
import { CONST } from "../../store/constants/constants";
import ModalDetails from "../../components/Modal/ModalDetails";
import Pagination from "../../components/Pagination/Pagination";

const Home = ({
  setTrending,
  trending,
  setAllCoins,
  allCoins,
  setCharts,
  charts,
  setDetails,
  details,
}) => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [currentNumber, setCurrentNumber] = React.useState(0);
  const [modalShow, setModalShow] = React.useState(false);

  const itemPerPage = 20;

  React.useEffect(() => {
    axios
      .get(`${CONST.API_URL}/all_currencies`)
      .then((response) => {
        setTrending(response.data);
        setAllCoins(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
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
    setCurrentNumber(e.target.id);
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
          <table className="table trending_table table-borderless">
            <thead>
              <tr className="trending_title">
                <th className="text-center" colSpan="5">
                  7 Trending Crypto
                </th>
              </tr>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Current Price</th>
                <th scope="col">Lowest / Highest 24h</th>
                <th scope="col">Price change / % Change</th>
              </tr>
            </thead>
            <tbody>
              {trending.slice(0, 7).map((t) => (
                <tr key={t.id}>
                  <td>
                    <img src={t.image} className="trending_img" alt={t.image} />
                    {t.name}
                  </td>
                  <td className="td text-center">{t.current_price} €</td>
                  <td className="td text-center">
                    {t.low_24h}/{t.high_24h} €
                  </td>
                  <td className="td text-center">
                    {t.price_change_24h} €/{t.price_change_percentage_24h} %
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
          <div className="container-card-currency">
            {currentCoins.map((c, i) => {
              return (
                <div
                  className={`card card_currency`}
                  key={c.id}
                  onClick={() => handleClickDetails(c.id)}
                >
                  <div className="card_header">
                    <img src={c.image} className="trending_img" alt={c.image} />
                    <div>
                      <div className="card_headername">{c.name}</div>
                      <div className="card_headersymbol">{c.symbol}</div>
                    </div>
                  </div>
                  <div className="card_content text-center">
                    <p className="card_currencyprice mx-auto">
                      {c.current_price} u/€
                    </p>
                  </div>
                  <div className="card_pricechange">
                    <p>{truncateDecimal(c.price_change_24h)} €</p>
                    <p>{c.price_change_percentage_24h} %</p>
                  </div>
                  <div className="card-footer card_footer">
                    <div className="low_24">
                      <p>{truncateOneDecimal(c.low_24h)} €</p>
                    </div>
                    <div className="high_24">
                      <p>{truncateOneDecimal(c.high_24h)} €</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
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

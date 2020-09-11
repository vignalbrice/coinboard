import React from "react";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import { CONST } from "../../store/constants/constants";

const Home = () => {
  const [trending, setTrending] = React.useState([]);
  const [allCoins, setAllCoins] = React.useState([]);
  const [charts, setCharts] = React.useState([]);
  const [details, setDetails] = React.useState([]);
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

  const renderPageNumbers = pageNumbers.map((number) => {
    return (
      <li
        key={number}
        id={number}
        onClick={handleClick}
        style={{ color: currentNumber === number && "blue" }}
      >
        {number}
      </li>
    );
  });

  const handleClickDetails = (id) => {
    axios
      .all([
        axios.get(`${CONST.API_URL}/currency_details/${id}`),
        axios.get(`${CONST.API_URL}/currency_marketChart/${id}`),
      ])
      .then((response) => {
        setCharts([response[0].data]);
        setDetails(response[1].data);
        setModalShow(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const truncateDecimal = (number) => {
    var with2Decimals = parseFloat(number).toFixed(3);
    return with2Decimals;
  };
  const truncateOneDecimal = (number) => {
    var with1Decimals = parseFloat(number).toFixed(2);
    return with1Decimals;
  };
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
          <ul id="page-numbers">{renderPageNumbers}</ul>

          <Modal
            show={modalShow}
            onHide={() => setModalShow(!modalShow)}
            centered
            dialogClassName="modal-90vw"
          >
            <Modal.Body>
              {details.map((d) => (
                <div key={d.id}>
                  <div className="card_header">
                    <img
                      src={d.image?.small}
                      className="trending_img"
                      alt={d.id}
                    />
                    <div>
                      <div className="card_headername">
                        {d.name} ({d.symbol})
                      </div>
                      <div className="official_link">
                        Official link:
                        <a href={d.links?.homepage[0]}> {d.name}</a>
                      </div>
                      <div className="current_price">
                        Current Price :{" "}
                        <span className="price">
                          {d.market_data?.current_price.eur} €
                        </span>
                      </div>
                    </div>
                    <div className="rank_container">
                      <p className="rank">#Rank {d.market_cap_rank}</p>
                    </div>
                  </div>
                  <HighchartsReact
                    options={{
                      xAxis: {
                        categories: [
                          "Jan",
                          "Feb",
                          "Mar",
                          "Apr",
                          "May",
                          "Jun",
                          "Jul",
                          "Aug",
                          "Sep",
                          "Oct",
                          "Nov",
                          "Dec",
                        ],
                      },
                      yAxis: {
                        title: charts,
                      },
                      series: [
                        {
                          name: "Price value per $USD",
                          pointInterval: 24 * 3600 * 1000,
                          data: charts.map((c) => c),
                        },
                      ],
                      title: {
                        text: "",
                      },
                    }}
                    highcharts={Highcharts}
                  />
                  <div className="modal_content">
                    <p className="title">What's the {d.name} ?</p>
                    <div className="description">{d.description?.fr}</div>
                  </div>
                </div>
              ))}
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={() => setModalShow(!modalShow)}>Close</Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default Home;

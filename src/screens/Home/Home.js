import React from "react";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";

const Home = () => {
  const [trending, setTrending] = React.useState([]);
  const [currencyName, setCurrencyName] = React.useState([]);
  const [allCoins, setAllCoins] = React.useState([]);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [selectedCard, setSelectedCard] = React.useState("");
  const [modalShow, setModalShow] = React.useState(false);

  const itemPerPage = 20;

  const API = "https://coinboard-api.herokuapp.com/api";
  React.useEffect(() => {
    axios
      .get(`${API}/all_currencies`)
      .then((response) => {
        setTrending(response.data);
        setCurrencyName(response.data.map((c) => c.name));
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
  };

  const renderPageNumbers = pageNumbers.map((number) => {
    return (
      <li key={number} id={number} onClick={handleClick}>
        {number}
      </li>
    );
  });

  const handleClickDetails = (id) => {
    axios
      .get(`${API}/currency_details/${id}`)
      .then((response) => {
        console.log(response.data);
        setModalShow(true);
      })
      .catch((error) => {
        console.log(error);
      });
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
                  7 Trending Cryto
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
          {/* <div className="col-4 mt-3 mb-4">
            <select>
              {currencyName.map((n, i) => (
                <option key={i}>{n}</option>
              ))}
            </select>
          </div> */}
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
                <div className="card_content  text-center">
                    <p className="card_currencyprice  mx-auto">{c.current_price} u/€</p>
                </div>
                <div className="card_footer"></div>
              </div>
            );
          })}
          </div>
          <ul id="page-numbers">{renderPageNumbers}</ul>
          <Modal
            show={modalShow}
            onHide={() => setModalShow(!modalShow)}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Body>
              <h4>Centered Modal</h4>
              <p>
                Cras mattis consectetur purus sit amet fermentum. Cras justo
                odio, dapibus ac facilisis in, egestas eget quam. Morbi leo
                risus, porta ac consectetur ac, vestibulum at eros.
              </p>
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

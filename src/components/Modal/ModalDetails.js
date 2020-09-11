import React from "react";
import { Modal, Button } from "react-bootstrap";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import moment from "moment";

const ModalDetails = ({ modalShow, setModalShow, details, charts }) => {
  return (
    <div>
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
                <img src={d.image?.small} className="trending_img" alt={d.id} />
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
                    categories: charts.map((c, i) =>
                      moment(c[0]).format("DD MMM YYYY")
                    ),
                  },
                  yAxis: {
                    title: charts,
                  },
                  series: [
                    {
                      name: "Price value per € Euro",
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
                <div className="description">
                  {d.description?.fr.replace(/(<([^>]+)>)/gi, "")}
                </div>
              </div>
            </div>
          ))}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setModalShow(!modalShow)}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ModalDetails;

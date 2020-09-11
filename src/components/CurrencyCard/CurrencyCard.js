import React from "react";

const CurrencyCard = ({
  currentCoins,
  truncateDecimal,
  truncateOneDecimal,
  handleClickDetails,
}) => {
  return (
    <div>
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
    </div>
  );
};

export default CurrencyCard;

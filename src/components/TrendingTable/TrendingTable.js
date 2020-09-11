import React from "react";

const TrendingTable = ({ trending }) => {
  return (
    <div>
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
    </div>
  );
};

export default TrendingTable;

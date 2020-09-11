import React from "react";

const About = () => {
  return (
    <div className="about">
      <div className="about_header">
        <p>About CoinBoard Website </p>
      </div>
      <div className="about_container">
        <p className="theteam">Who's the devteam ?</p>
        <div className="about_teams">
          <div className="team_member">
            <a href="https://github.com/SufranjNaweed" target="_blank">
              <img src="https://avatars2.githubusercontent.com/u/38285793?s=460&u=56ada43655711929c6be8cfed89e22ca5b1e7a46&v=4" />
            </a>
            <span>Naweed Sufranj</span>
          </div>
          <div className="team_member">
            <a href="https://github.com/YMatoka" target="_blank">
              <img src="https://avatars3.githubusercontent.com/u/38285790?s=460&v=4" />
            </a>
            <span>Yann Matoka</span>
          </div>
          <div className="team_member">
            <a href="https://github.com/vignalbrice" target="_blank">
              <img src="https://avatars1.githubusercontent.com/u/16915995?s=460&u=c936292c192578cc85337f647b0da2fee3357407&v=4" />
            </a>
            <span>Brice Vignal</span>
          </div>
        </div>
        <p className="thecrypto">What's a cryptocurrency ?</p>
        <div className="about_crypto">
          <img src="https://image.freepik.com/vecteurs-libre/collection-pieces-colorees-cryptocurrency_23-2147788781.jpg" />
          <div className="card">
            <p>
              <b>Def :</b> A cryptocurrency (or crypto currency) is a digital
              asset designed to work as a medium of exchange wherein individual
              coin ownership records are stored in a ledger existing in a form
              of computerized database using strong cryptography to secure
              transaction records, to control the creation of additional coins,
              and to verify the transfer of coin ownership. It typically does
              not exist in physical form (like paper money) and is typically not
              issued by a central authority. Cryptocurrencies typically use
              decentralized control as opposed to centralized digital currency
              and central banking systems. When a cryptocurrency is minted or
              created prior to issuance or issued by a single issuer, it is
              generally considered centralized. When implemented with
              decentralized control, each cryptocurrency works through
              distributed ledger technology, typically a blockchain, that serves
              as a public financial transaction database.
            </p>
          </div>
        </div>
        <div className="footer">
          <div className="copyright">Copyright By Naweed, Yann and Brice</div>
        </div>
      </div>
    </div>
  );
};

export default About;

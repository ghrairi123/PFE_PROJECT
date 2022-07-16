import React from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";

function AccountType() {
  const style = {
    marginTop: "70px",
  };

  return (
    <div>
      <section
        class="account-section bg_img"
        data-background="assets/images/account/account-bg.jpg"
      >
        <div class="container">
          <div class="padding-top padding-bottom">
            <div class="account-area" style={style}>
              <div class="section-header-3">
                <span class="cate">Bienvenue!</span>
                <h3>choisissez votre type de compte</h3>
              </div>
              <form class="account-form">
                <div class="form-group">
                  <div class="form-group text-center">
                    <Link to="/SignupCustomer">
                      <input type="submit" value="Client" />
                    </Link>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <Link to="/SignUpOrg">
                      <input type="submit" value="Organisateur" />
                    </Link>{" "}
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AccountType;

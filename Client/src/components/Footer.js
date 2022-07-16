import React from "react";
import { useDispatch, useSelector } from "react-redux";
function Footer() {
  const {
    account: { role },
    authenticated,
  } = useSelector((state) => state.auth);

  return (
    <div>
      {!authenticated ? (
        <footer class="footer-section">
          <br />
          <br />
          <br />
          <div class="newslater-section padding-bottom">
            <div class="container">
              <div
                class="newslater-container bg_img"
                data-background="assets/images/newslater/newslater-bg01.jpg"
              >
                <div class="newslater-wrapper">
                  <h5 class="cate">INSCRIVEZ-VOUS À BOLETO </h5>
                  <h4 class="title" style={{ color: "white" }}>
                    pour obtenir des avantages exclusifs
                  </h4>
                  <form class="newslater-form">
                    <a href="/AccountType">
                      <button type="submit">s'abonner</button>
                    </a>
                  </form>
                  <br></br>
                  <p>
                    Nous respectons votre vie privée, nous ne partageons donc
                    jamais vos informations
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="container">
            <div class="footer-top">
              <div class="logo">
                <a href="index-1.html">
                  <img
                    src="assets/images/footer/footer-logo.png"
                    alt="footer"
                  />
                </a>
              </div>
              <ul class="social-icons">
                <li>
                  <a href="https://www.facebook.com/" target="_blank">
                    <i class="fab fa-facebook-f"></i>
                  </a>
                </li>
                <li>
                  <a href="https://twitter.com/?lang=en" target="_blank">
                    <i class="fab fa-twitter"></i>
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.pinterest.fr/ghrairimarwa54/_saved/"
                    target="_blank"
                  >
                    <i class="fab fa-pinterest-p"></i>
                  </a>
                </li>
                <li>
                  <a href="https://www.instagram.com/?hl=fr" target="_blank">
                    <i class="fab fa-instagram"></i>
                  </a>
                </li>
              </ul>
            </div>
            <div class="footer-bottom">
              <div class="footer-bottom-area">
                <div class="left">
                  <p>
                    Copyright © 2020.Tous droits réservés par{" "}
                    <a href="#0">Boleto </a>
                  </p>
                </div>
                <ul class="links">
                  <li>
                    <a href="/Propos">À propos</a>
                  </li>
                  <li>
                    <a href="/contact">Contact</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </footer>
      ) : authenticated && role === "client" ? (
        <footer class="footer-section">
          <br /> <br />
          <div class="newslater-section padding-bottom">
            <div class="container">
              <div
                class="newslater-container bg_img"
                data-background="assets/images/newslater/newslater-bg01.jpg"
              >
                <div class="newslater-wrapper">
                  <h5 class="cate">INSCRIVEZ-VOUS À BOLETO </h5>
                  <h4 class="title" style={{ color: "white" }}>
                    pour obtenir des avantages exclusifs
                  </h4>
                  <form class="newslater-form">
                    <a href="/AccountType">
                      <input type="text" placeholder="Votre adresse email" />
                      <button type="submit">s'abonner</button>
                    </a>
                  </form>
                  <p>
                    Nous respectons votre vie privée, nous ne partageons donc
                    jamais vos informations
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="container">
            <div class="footer-top">
              <div class="logo">
                <a href="index-1.html">
                  <img
                    src="assets/images/footer/footer-logo.png"
                    alt="footer"
                  />
                </a>
              </div>
              <ul class="social-icons">
                <li>
                  <a href="https://www.facebook.com/" target="_blank">
                    <i class="fab fa-facebook-f"></i>
                  </a>
                </li>
                <li>
                  <a href="https://twitter.com/?lang=en" target="_blank">
                    <i class="fab fa-twitter"></i>
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.pinterest.fr/ghrairimarwa54/_saved/"
                    target="_blank"
                  >
                    <i class="fab fa-pinterest-p"></i>
                  </a>
                </li>
                <li>
                  <a href="https://www.instagram.com/?hl=fr" target="_blank">
                    <i class="fab fa-instagram"></i>
                  </a>
                </li>
              </ul>
            </div>
            <div class="footer-bottom">
              <div class="footer-bottom-area">
                <div class="left">
                  <p>
                    Copyright © 2020.Tous droits réservés par{" "}
                    <a href="#0">Boleto </a>
                  </p>
                </div>
                <ul class="links">
                  <li>
                    <a href="/Propos">À propos</a>
                  </li>
                  <li>
                    <a href="/contact">Contact</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </footer>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default Footer;

import React from "react";
import { useDispatch, useSelector } from "react-redux";

function about() {
  //const OrganAccount = useSelector((state) => state.Static.OrganAccount);

  return (
    <div>
      <section
        class="main-page-header speaker-banner bg_img"
        data-background="assets/images/banner/banner07.jpg"
      >
        <div class="container">
          <div class="speaker-banner-content">
            <h2 class="title">à propos de nous</h2>
            <ul class="breadcrumb">
              <li>
                <a href="index.html">Accueil</a>
              </li>
              <li>à propos </li>
            </ul>
          </div>
        </div>
      </section>
      <section class="about-section padding-top padding-bottom">
        <div class="container">
          <div class="row justify-content-between">
            <div class="col-lg-6">
              <div class="event-about-content">
                <div class="section-header-3 left-style m-0">
                  <span class="cate">NOUS SOMMES BOLETO</span>
                  <h2 class="title">APPRENDRE A NOUS CONNAITRE</h2>
                  <p>
                    notre site web facilite et accélère le marketing en ligne
                    des événements. D’une part, Les organisateurs présentent
                    leurs évènements, et d’autre part les clients visualisent et
                    achètent les billets.
                  </p>
                  <a href="/Login" class="custom-button">
                    réserver des billets
                  </a>
                </div>
              </div>
            </div>
            <div class="col-lg-5 d-none d-lg-block">
              <div class="about-thumb">
                <img src="assets/images/about/about01.png" alt="about" />
              </div>
            </div>
          </div>
        </div>
      </section>
      <div
        class="philosophy-section padding-top padding-bottom bg-one bg_img bg_quater_img"
        data-background="assets/images/about/about-bg.jpg"
      >
        <div class="container">
          <div class="row">
            <div class="col-lg-9 offset-lg-3 bg-two">
              <div class="philosophy-content">
                <div class="section-header-3 left-style">
                  <span class="cate">REGARDEZ</span>
                  <h2 class="title">Notre Philosophie</h2>
                  <p class="ml-0">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                    sed do eiusmtempor incididunt labore et dolore magna aliqu
                    enim ad minim veniam quis nostrud exercitation ullamco
                    laboris nisi ut aliquip
                  </p>
                </div>
                <ul class="phisophy-list">
                  <li>
                    <div class="thumb">
                      <img
                        src="assets/images/philosophy/icon1.png"
                        alt="philosophy"
                      />
                    </div>
                    <h5 class="title">Honnêteté & équité </h5>
                  </li>
                  <li>
                    <div class="thumb">
                      <img
                        src="assets/images/philosophy/icon2.png"
                        alt="philosophy"
                      />
                    </div>
                    <h5 class="title">Clarté & transparence</h5>
                  </li>
                  <li>
                    <div class="thumb">
                      <img
                        src="assets/images/philosophy/icon3.png"
                        alt="philosophy"
                      />
                    </div>
                    <h5 class="title">Focus sur les clients</h5>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section class="about-counter-section padding-bottom padding-top">
        <div class="container">
          <div class="row">
            <div class="col-lg-4">
              <div class="section-header-3 left-style mb-lg-0">
                <span class="cate">FAITS RAPIDES</span>
                <h2 class="title">faits amusants</h2>
              </div>
            </div>
            <div class="col-lg-8">
              <div class="about-counter">
                <div class="counter-item">
                  <div class="counter-thumb">
                    <img
                      src="assets/images/about/about-counter01.png"
                      alt="about"
                    />
                  </div>
                  <div class="counter-content">
                    <h3 class="title odometer" data-odometer-final="30"></h3>
                    <h3 class="title">M+</h3>
                  </div>
                  <span class="d-block info">clients</span>
                </div>
                <div class="counter-item">
                  <div class="counter-thumb">
                    <img
                      src="assets/images/about/about-counter01.png"
                      alt="about"
                    />
                  </div>
                  <div class="counter-content">
                    <h3 class="title odometer" data-odometer-final="30"></h3>
                    <h3 class="title">M+</h3>
                  </div>
                  <span class="d-block info">Organisateurs</span>
                </div>
                <div class="counter-item">
                  <div class="counter-thumb">
                    <img
                      src="assets/images/about/about-counter02.png"
                      alt="about"
                    />
                  </div>
                  <div class="counter-content">
                    <h3 class="title odometer" data-odometer-final="11"></h3>
                  </div>
                  <span class="d-block info">Contries</span>
                </div>
                <div class="counter-item">
                  <div class="counter-thumb">
                    <img
                      src="assets/images/about/about-counter03.png"
                      alt="about"
                    />
                  </div>
                  <div class="counter-content">
                    <h3 class="title odometer" data-odometer-final="650"></h3>
                    <h3 class="title">+</h3>
                  </div>
                  <span class="d-block info">Towns & Cities</span>
                </div>
                <div class="counter-item">
                  <div class="counter-thumb">
                    <img
                      src="assets/images/about/about-counter04.png"
                      alt="about"
                    />
                  </div>
                  <div class="counter-content">
                    <h3 class="title odometer" data-odometer-final="7"></h3>
                    <h3 class="title">+</h3>
                  </div>
                  <span class="d-block info">événements</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="gallery-section padding-top padding-bottom bg-one">
        <div class="container">
          <div class="section-header-3">
            <span class="cate">Jetez un œil à notre</span>
            <h2 class="title">Un billet pour chaque fan.</h2>
            <p>
              le monde s'engage à faire de la participation à l'événement un
              expérience sans harcèlement pour tout le monde, quel que soit le
              niveau de expérience, genre, identité et expression de genre
            </p>
          </div>
          <div class="row justify-content-center gallery-wrapper mb-30-none">
            <div class="col-lg-3 col-sm-6">
              <div class="gallery-item two">
                <div class="gallery-thumb">
                  <a href="assets/images/gallery/gallery05.jpg" class="img-pop">
                    <i class="fas fa-search"></i>
                  </a>
                  <img
                    src="assets/images/gallery/gallery05.jpg"
                    alt="gallery"
                  />
                </div>
              </div>
              <div class="gallery-item two">
                <div class="gallery-thumb">
                  <a href="assets/images/gallery/gallery06.jpg" class="img-pop">
                    <i class="fas fa-search"></i>
                  </a>
                  <img
                    src="assets/images/gallery/gallery06.jpg"
                    alt="gallery"
                  />
                </div>
              </div>
              <div class="gallery-item two">
                <div class="gallery-thumb">
                  <a href="assets/images/gallery/gallery07.jpg" class="img-pop">
                    <i class="fas fa-search"></i>
                  </a>
                  <img
                    src="assets/images/gallery/gallery07.jpg"
                    alt="gallery"
                  />
                </div>
              </div>
            </div>
            <div class="col-sm-6 col-lg-3 order-lg-1">
              <div class="gallery-item two">
                <div class="gallery-thumb">
                  <a href="assets/images/gallery/gallery11.jpg" class="img-pop">
                    <i class="fas fa-search"></i>
                  </a>
                  <img
                    src="assets/images/gallery/gallery11.jpg"
                    alt="gallery"
                  />
                </div>
              </div>
              <div class="gallery-item two">
                <div class="gallery-thumb">
                  <a href="assets/images/gallery/gallery12.jpg" class="img-pop">
                    <i class="fas fa-search"></i>
                  </a>
                  <img
                    src="assets/images/gallery/gallery12.jpg"
                    alt="gallery"
                  />
                </div>
              </div>
              <div class="gallery-item two">
                <div class="gallery-thumb">
                  <a href="assets/images/gallery/gallery13.jpg" class="img-pop">
                    <i class="fas fa-search"></i>
                  </a>
                  <img
                    src="assets/images/gallery/gallery13.jpg"
                    alt="gallery"
                  />
                </div>
              </div>
            </div>
            <div class="col-lg-6">
              <div class="gallery-item two">
                <div class="gallery-thumb">
                  <a href="assets/images/gallery/gallery08.jpg" class="img-pop">
                    <i class="fas fa-search"></i>
                  </a>
                  <img
                    src="assets/images/gallery/gallery08.jpg"
                    alt="gallery"
                  />
                </div>
              </div>
              <div class="row">
                <div class="col-sm-6">
                  <div class="gallery-item two">
                    <div class="gallery-thumb">
                      <a
                        href="assets/images/gallery/gallery09.jpg"
                        class="img-pop"
                      >
                        <i class="fas fa-search"></i>
                      </a>
                      <img
                        src="assets/images/gallery/gallery09.jpg"
                        alt="gallery"
                      />
                    </div>
                  </div>
                </div>
                <div class="col-sm-6">
                  <div class="gallery-item two">
                    <div class="gallery-thumb">
                      <a
                        href="assets/images/gallery/gallery10.jpg"
                        class="img-pop"
                      >
                        <i class="fas fa-search"></i>
                      </a>
                      <img
                        src="assets/images/gallery/gallery10.jpg"
                        alt="gallery"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="tour-section padding-top padding-bottom">
        <div class="container">
          <div class="row">
            <div class="col-lg-6">
              <div class="tour-content">
                <div class="section-header-3 left-style">
                  <h2 class="title">GARANTIES VOUS POUVEZ CROIRE.</h2>
                  <p class="ml-0">
                    Parce que plus de tranquillité d'esprit signifie plus
                    d'amour pour l'événement.
                  </p>
                </div>
                <ul class="list-tour">
                  <li>
                    <div class="thumb">
                      <img src="assets/images/tour/icon01.png" alt="tour" />
                    </div>
                    <div class="content">
                      <h5 class="title">Obtenez la garantie</h5>
                      <p>
                        Billets authentiques, livraison à temps et accès à votre
                        un événement. Ou remboursé. Période.
                      </p>
                    </div>
                  </li>
                  <li>
                    <div class="thumb">
                      <img src="assets/images/tour/icon02.png" alt="tour" />
                    </div>
                    <div class="content">
                      <h5 class="title">garantie de correspondance de prix</h5>
                      <p>
                        Les meilleurs prix sont ici. Si vous repérez une
                        meilleure offre ailleurs, nous couvrirons la différence.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div class="col-lg-6 d-none d-lg-block">
              <div class="tour-thumb">
                <img src="assets/images/tour/tour.png" alt="tour" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default about;

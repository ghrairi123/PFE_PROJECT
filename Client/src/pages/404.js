import React from 'react'

const error404 = () =>  {
    return (
        <div>
             <section class="section-404 padding-top padding-bottom">
        <div class="container">
            <div class="thumb-404">
                <img src="assets/images/404.png" alt="404" />
            </div>
            <h3 class="title">Oups... On dirait que vous vous êtes perdu :(</h3>
            <a href="/" class="custom-button">Retour à l'accueil <i class="flaticon-right"></i></a>
        </div>
    </section>
  
        </div>
    )
}

export default error404

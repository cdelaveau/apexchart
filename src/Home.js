import React from "react";
import './Commun.css';
import backimage from './img/backimage.jpg';
import Carousel from "./AnimeCarouselComponent";
import AnimatedText from "./Textintroduce";


function Home() {
    return (
        <div>
            <div>
                <img src={backimage} alt="yes" className='imgback' />
            </div>
            <h1>Bienvenue sur le site AnimeStats</h1>
            <br />
            <h2>AnimeStats est votre guichet unique pour des statistiques détaillées et des graphiques époustouflants sur l'univers passionnant des animes et mangas.<br></br>
            Que vous soyez un fan inconditionnel ou un nouveau venu dans le monde de l'animation japonaise, notre site Web vous offre une mine d'informations<br></br>
            fascinantes qui vous permettront de découvrir les tendances, les personnages préférés, les studios de production et bien plus encore.</h2>
            <AnimatedText />
            <br></br>
            <hr></hr>
            <br></br>
            <p id="p">Découvrez quelques uns des animes et mangas présent<br></br>dans notre base de données</p>
            <br></br>
            <Carousel />
        </div>
    );
}

export default Home;

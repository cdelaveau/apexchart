//ici tu peux modifier les styles dans About.css et si tu veux mettre des images suit la méthode dans le fichier Home.js
import React from "react";
import './Commun.css';
import reactLogo from './img/logo react js.png';
import apexchartLogo from './img/logo apexchart js.png';
import backimage from './img/backimage.jpg';

function About() {
    return (
        <div>
            <div>
                <img src={backimage} alt="yes" className='imgback' />
            </div>
            <p className="about-desc">Ce site a été réalisé avec le framework <strong><a href="https://react.dev">React JS</a></strong></p>
            <br />
            <div className="img-container">
                <img src={reactLogo} alt="react js logo" className='img-logo' />
            </div>
            <p className="about-desc">Les graphiques ont été réalisés avec la bibliothèque <strong><a href="https://apexcharts.com">Apexchart JS</a></strong></p>
            <br />
            <div className="img-container">
                <img src={apexchartLogo} alt="apexchart js logo" className='img-logo' />
            </div>
            <h2>À propos de la SAÉ</h2>
            <br />
            <div className="about-div-section">
            <h3>Professeurs référents :</h3>
            <br />
                <ul>
                    <li className="li-desc">Mr Cavaillé</li>
                    <p className="li-desc">   - Développement Web</p>
                    <li className="li-desc">Mme Pirounakis</li>
                    <p className="li-desc">   - Culture artistique</p>
                    <li className="li-desc">Mr Mole</li>
                    <p className="li-desc">   - Motion design</p>
                </ul>
                <br />
                <h3>Notre équipe :</h3>
                <br />
                <ul>
                    <li className="li-desc">Kirkland</li>
                    <p className="li-desc">   - Designer de l'équipe et en charge de la partie design du site</p>
                    <li className="li-desc">Cyriaque</li>
                    <p className="li-desc">   - Développeur Web de l'équipe et en charge de la partie programmation du site</p>
                </ul>
                <br />
                <h3>Notre thématique :</h3>
                <br />
                <ul>
                    <li className="li-desc">Short Jokes  | Kaggle</li>
                    <p className="li-desc">   - Jeu de données sur les blagues courtes | Non-utilisé</p>
                    <p className="li-desc"><a href="https://www.kaggle.com/datasets/abhinavmoudgil95/short-jokes?select=shortjokes.csv">   - visiter le site</a></p>
                    <li className="li-desc">Chess Game Dataset (Lichesse)  | Kaggle</li>
                    <p className="li-desc">   - Jeu de données sur les coups au jeu d'échec | Non-utilisé</p>
                    <p className="li-desc"><a href="https://www.kaggle.com/datasets/datasnaek/chess">   - visiter le site</a></p>
                    <li className="li-desc">Movies on Netflix, Prime Video, Hulu and Disney+  | Kaggle</li>
                    <p className="li-desc">   - Jeu de données sur les films sur les plateformes de streaming | Non-utilisé</p>
                    <p className="li-desc"><a href="https://www.kaggle.com/datasets/ruchi798/movies-on-netflix-prime-video-hulu-and-disney">   - visiter le site</a></p>
                    <li className="li-desc">MyAnimeList Anime and Manga Datasets  | Kaggle</li>
                    <p className="li-desc">   - Jeu de données sur les animes et mangas | Utilisé</p>
                    <p className="li-desc"><a href="https://www.kaggle.com/datasets/andreuvallhernndez/myanimelist">   - visiter le site</a></p>
                </ul>
            </div>
            <br />
        </div>
    );
}

export default About;
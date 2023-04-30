import React, { useState } from "react";
import ApexCharts from "react-apexcharts";
import animes from "./Animes";
import "./Commun.css";


// Premier graphique


function getMinMax(arr) {
  return arr.reduce(
    (acc, curr) => {
      return {
        min: Math.min(acc.min, curr),
        max: Math.max(acc.max, curr),
      };
    },
    { min: Infinity, max: -Infinity } // on définis la valeur initiale pour trouver les valeurs minimales et maximales
  );
}

function filterTopAnimes(top) {
  return animes
    .slice() // on créer une copie de la liste des animes
    .sort((a, b) => b.score - a.score) // on trie par score décroissant
    .slice(0, top); // on garde seulement les 'top' premiers éléments
}
// on instancie la fonction pour créer le graphique
function BarChart() {
  const [topAnimes, setTopAnimes] = useState(filterTopAnimes(3)); // on initialise avec les 3 premiers animes

  const categories = topAnimes.map((anime) => anime.title); // on prend en paramètre les titres des animes
  const scores = topAnimes.map((anime) => anime.score); // on prend en paramètre les scores des animes
  const scoredBy = topAnimes.map((anime) => anime.scored_by); // on prend en paramètre les nombres de personnes ayant noté les animes

  const { min: minScore, max: maxScore } = getMinMax(scores); // on prend les valeurs minimales et maximales des scores
  const { min: minScoredBy, max: maxScoredBy } = getMinMax(scoredBy); // on prend les valeurs minimales et maximales des nombres de personnes ayant noté

  // on définis les options du graphique

  const options = {
    chart: {
      type: "bar",
      height: 550,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: 50,
        dataLabels: {
          position: "top",
        },
      },
    },
    colors: ["#FF5733", "#33FF57"],
    dataLabels: {
      enabled: false,
      offsetY: -50,
      style: {
        fontSize: "14px",
        colors: ["#000000"],
      },
    },
    xaxis: {
      categories: categories,
      labels: {
        style: {
          fontSize: "14px",
          colors: ["#000000"],
        },
        rotate: -45,
        trim: true,
        hideOverlappingLabels: true,
        offsetY: 5,
      },
      axisBorder: {
        show: true,
        color: "#ffffff",
      },
      axisTicks: {
        show: true,
        borderType: "solid",
        color: "#ffffff",
      },
    },
    yaxis: [
      {
        seriesName: "Score de l'anime",
        min: minScore,
        max: maxScore,
        title: {
          text: "score de l'anime",
          style: {
            fontSize: "14px",
            fontWeight: "bold",
            color: "#ffffff",
          },
        },
      },
      {
        opposite: true,
        seriesName: "Personnes ayant noté l'anime",
        min: minScoredBy,
        max: maxScoredBy,
        title: {
          text: "Personnes ayant noté l'anime",
          style: {
            fontSize: "14px",
            fontWeight: "bold",
            color: "#ffffff",
          },
        },
      },
    ],
    tooltip: {
      enabled: true,
    },
    responsive: [
      {
        breakpoint: 768,
        options: {
          plotOptions: {
            bar: {
              columnWidth: "70%",
            },
          },
          xaxis: {
            labels: {
              rotate: -45,
              offsetY: 5,
            },
          },
        },
      },
      {
        breakpoint: 576,
        options: {
          plotOptions: {
            bar: {
              columnWidth: "100%",
            },
          },
          xaxis: {
            labels: {
              rotate: -90,
              offsetY: 0,
            },
          },
        },
      },
    ],
  };
  
  // on définis la série de données à affichée

  const series = [
    {
      name: "Score de l'anime",
      data: scores,
    },
    {
      name: "Personnes ayant noté l'anime",
      data: scoredBy,
    },
  ];

  // on définis la gestion du clic sur le bouton pour changer le nombre d'animes affichés
  const handleClick = (top) => {
    setTopAnimes(filterTopAnimes(top));
  };

  // on affiche le graphique
  return (
    <div className="filter-div">
      <label>Afficher les animes du </label>
      <button onClick={() => handleClick(3)}> Top 3 </button>
      <label> ou du </label>
      <button onClick={() => handleClick(10)}> Top 10</button>
      <ApexCharts options={options} series={series} type="bar" height="550" />
    </div>
  );
}


// Deuxième graphique


function filterTopAnimesBySource(top) { // on filtres les animes par source et on récupère les top classement
  
  // on comptes le nombre d'animes par source
  const sourceCount = animes.reduce((acc, curr) => {
    acc[curr.source] = (acc[curr.source] || 0) + 1;
    return acc;
  }, {});

  // on récupère les sources les plus présentes et on garde les top classement
  const sources = Object.entries(sourceCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, top)
    .map((entry) => entry[0]);
  
  // on récupère les animes dont la source est parmi les top classement
  return animes.filter((anime) => sources.includes(anime.source));
}

// on instancie la fonction pour créer le graphique
function PieChart() {

  // on initialise l'état des animes affichés avec les top 3 par source
  const [topAnimesBySource, setTopAnimesBySource] = useState(filterTopAnimesBySource(3));

  // on compte le nombre d'animes par source
  const countBySource = topAnimesBySource.reduce((acc, curr) => {
    acc[curr.source] = (acc[curr.source] || 0) + 1;
    return acc;
  }, {});

  const series = Object.values(countBySource); // on prépare les données des séries pour le graphique
  const labels = Object.keys(countBySource); // on prépare les données des labels pour le graphique

  // on définis les options du graphique 
  const options = {
    labels: labels,
    chart: {
      type: "pie",
      height: 550,
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          legend: {
            position: "bottom",
          },
        },
      },
    ],
    colors: ["#FF5733", "#33FF57", "#304758", "#C6FFDD", "#FF7F50", "#F7DC6F", "#7DCEA0", "#6C3483", "#F1C40F", "#3498DB"],
    tooltip: {
      enabled: true,
    },
  };

  // on définis la gestion du clic sur le bouton pour changer le nombre d'animes affichés
  const handleClick = (top) => {
    setTopAnimesBySource(filterTopAnimesBySource(top));
  };

  // on affiche le graphique
  return (
    <div className="filter-div">
      <label>Afficher les sources d'animes du </label>
      <button onClick={() => handleClick(3)}> Top 3</button>
      <label> ou du </label>
      <button onClick={() => handleClick(10)}> Top 10</button>
      <ApexCharts options={options} series={series} type="pie" height="550" />
    </div>
  );
}


// Troisième graphique

// on filtres les 10 animes avec le plus grand nombre d'épisodes
function filterTopAnimesByEpisodes(top) {
  return animes
    .slice()
    .sort((a, b) => b.episodes - a.episodes)
    .slice(0, top);
}

// on instancie la fonction pour créer le graphique
function BarChart2() {

  // on utilise le state pour stocker les 10 animes avec le plus grand nombre d'épisodes
  const [topAnimesByEpisodes, setTopAnimesByEpisodes] = useState(filterTopAnimesByEpisodes(10));

  const categories = topAnimesByEpisodes.map((anime) => anime.title); // on prend en paramètre le titre des animes
  const episodes = topAnimesByEpisodes.map((anime) => anime.episodes); // on prend en paramètre le nombre d'épisodes des animes

  // on définis les options du graphique
  const options = {
    chart: {
      type: "bar",
      height: 550,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "50%",
        dataLabels: {
          position: "top",
        },
      },
    },
    colors: ["#FF5733", "#33FF57", "#304758", "#C6FFDD", "#FF7F50", "#F7DC6F", "#7DCEA0", "#6C3483", "#F1C40F", "#3498DB", "#2ECC71", "#E74C3C", "#9B59B6", "#F5B7B1", "#E67E22", "#16A085", "#BDC3C7", "#8E44AD", "#ABB2B9", "#F0E68C"],
    dataLabels: {
      enabled: false,
      offsetY: -50,
      style: {
        fontSize: "14px",
        colors: ["#000000"],
      },
    },
    xaxis: {
      categories: categories,
      labels: {
        style: {
          fontSize: "14px",
          colors: ["#000000"],
        },
        rotate: -45,
        trim: true,
        hideOverlappingLabels: true,
      },
      axisBorder: {
        show: true,
        color: "#ffffff",
      },
      axisTicks: {
        show: true,
        borderType: "solid",
        color: "#ffffff",
      },
    },
    yaxis: {
      title: {
        text: "Nombre d'épisodes",
        style: {
          fontSize: "14px",
          fontWeight: "bold",
          color: "#ffffff",
        },
      },
    },
    tooltip: {
      enabled: true,
    },
    responsive: [
      {
        breakpoint: 768,
        options: {
          chart: {
            height: 350,
          },
          xaxis: {
            labels: {
              rotate: -90,
            },
          },
        },
      },
    ],
  };

  // on définis la série de données à affichée
  const series = [
    {
      name: "Nombre d'épisodes",
      data: episodes,
    },
  ];

  // on définis la gestion du clic sur le bouton pour changer le nombre d'animes affichés
  const handleClick = (top) => {
    setTopAnimesByEpisodes(filterTopAnimesByEpisodes(top));
  };

  // on affiche le graphique
  return (
    <div className="filter-div">
      <label>Afficher les animes ayant le plus d'épisode du </label>
      <button onClick={() => handleClick(10)}> Top 10</button>
      <label> ou du </label>
      <button onClick={() => handleClick(20)}> Top 20</button>
      <ApexCharts options={options} series={series} type="bar" height={550} />
    </div>
  );
}


// Quatrième graphique

// on calcule le nombre d'animes sortis pour chaque année et on garde les années ayant le plus d'animes sortis
function filterTopAnimesByYear(top) {
  const yearCount = animes.reduce((acc, curr) => {
    const year = new Date(curr.start_date).getFullYear();
    acc[year] = (acc[year] || 0) + 1;
    return acc;
  }, {});

  const years = Object.entries(yearCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, top)
    .map((entry) => parseInt(entry[0]));
  
  // on retourne tous les animes sortis ces années-là
  return animes.filter((anime) => years.includes(new Date(anime.start_date).getFullYear()));
}

// on instancie la fonction pour créer le graphique
function LineChart() {

  // on utilise le state topAnimesByYear qui contient les meilleurs animes sortis au cours des années qui ont le plus d'animes
  const [topAnimesByYear, setTopAnimesByYear] = useState(filterTopAnimesByYear(3));

  const countByYear = topAnimesByYear.reduce((acc, curr) => { // on calcule le nombre d'animes sortis chaque année pour les années qui ont le plus d'animes sortis
    const year = new Date(curr.start_date).getFullYear();
    acc[year] = (acc[year] || 0) + 1;
    return acc;
  }, {});

  // on définis les options du graphique
  const options = {
    chart: {
      type: "line",
      height: 550,
    },
    colors: ["#FF5733"], 
    xaxis: {
      categories: Object.keys(countByYear),
      labels: {
        style: {
          color: ["#000000"], 
        },
        rotate: -45,
      },
    },
    yaxis: {
      title: {
        text: "Nombre d'animes",
        style: {
          fontSize: "14px",
          fontWeight: "bold",
          color: "#ffffff",
        },
      },
    },
    responsive: [
      {
        breakpoint: 1024,
        options: {
          chart: {
            height: 400,
          },
        },
      },
      {
        breakpoint: 768,
        options: {
          chart: {
            height: 300,
          },
          xaxis: {
            labels: {
              rotate: -90,
            },
          },
        },
      },
      {
        breakpoint: 576,
        options: {
          chart: {
            height: 200,
          },
          xaxis: {
            labels: {
              rotate: -90,
              offsetY: -5,
              offsetX: -10,
            },
          },
        },
      },
    ],
  };
  
  // on définis la série de données à utilisée
  const series = [
    {
      name: "Nombre d'animes",
      data: Object.values(countByYear),
    },
  ];

  // on définis la gestion du clic sur le bouton pour changer le nombre d'animes affichés
  const handleClick = (top) => {
    setTopAnimesByYear(filterTopAnimesByYear(top));
  };

  // on affiche le graphique
  return (
    <div className="filter-div">
      <label>Afficher les meilleures années de sorties d'animes du </label>
      <button onClick={() => handleClick(3)}> Top 3</button>
      <label> ou du </label>
      <button onClick={() => handleClick(10)}> Top 10</button>
      <ApexCharts options={options} series={series} type="line" height="550" />
    </div>
  );
}


// Cinquième graphique

// on prend en entrée le nombre de studios à filtrer et on renvoie un tableau des studios en top classement triés en fonction du nombre d'animes produits par studio
function filterTopStudiosByAnimes(top) {
  const studioCount = animes.reduce((acc, curr) => {
    const studio = curr.studios;
    acc[studio] = (acc[studio] || 0) + 1;
    return acc;
  }, {});

  const sortedStudios = Object.entries(studioCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, top);

  return sortedStudios.map((entry) => ({
    x: entry[0], // on prend en paramètre le nom du studio
    y: entry[1], // on prend en paramètre le nombre d'animes produits par studio
  }));
}

// on instancie la fonction pour créer le graphique
function TreeMapChart() {
  const [topStudiosByAnimes, setTopStudiosByAnimes] = useState(filterTopStudiosByAnimes(10));

  // on définis les options du graphique 
  const options = {
    chart: {
      type: "treemap",
      height: 550,
    },
    title: {
      text: "Répartition des animes par studio",
      align: "center",
      style: {
        fontSize: "14px",
        fontWeight: "bold",
        color: "#ffffff",
      },
    },
    plotOptions: {
      treemap: {
        distributed: true,
      },
      tooltip: {
        enabled: true,
      },
    },
    colors: ["#FF5733", "#33FF57", "#304758", "#C6FFDD", "#FF7F50", "#F7DC6F", "#7DCEA0", "#6C3483", "#F1C40F", "#3498DB"],
    responsive: [
      {
        breakpoint: 576,
        options: {
          chart: {
            height: 400,
          },
        },
      },
      {
        breakpoint: 768,
        options: {
          chart: {
            height: 500,
          },
        },
      },
      {
        breakpoint: 992,
        options: {
          chart: {
            height: 600,
          },
        },
      },
      {
        breakpoint: 1200,
        options: {
          chart: {
            height: 700,
          },
        },
      },
    ],
  };
  
  // on définis la série de données à utilisée
  const series = [
    {
      name: "Nombre d'animes",
      data: topStudiosByAnimes,
    },
  ];

  // on définis la gestion du clic sur le bouton pour changer le nombre d'animes affichés
  const handleClick = (top) => {
    setTopStudiosByAnimes(filterTopStudiosByAnimes(top));
  };
  
  // on affiche le graphique
  return (
    <div className="filter-div">
      <label>Afficher les meilleurs studios d'animes du </label>
      <button onClick={() => handleClick(3)}> Top 3</button>
      <label> ou du </label>
      <button onClick={() => handleClick(10)}> Top 10</button>
      <ApexCharts options={options} series={series} type="treemap" height="550" />
    </div>
  );
}


// Sixième graphique

// on obtient la liste unique des genres d'animes
function getUniqueGenres() {
  const genresSet = new Set();

  // on parcours chaque anime et on ajoute ses genres à l'ensemble
  animes.forEach((anime) => {
    anime.genres.forEach((genre) => genresSet.add(genre));
  });

  // on convertis l'ensemble des genres en un tableau pour le retourner
  return Array.from(genresSet);
}

// on obtient les scores des animes pour chaque genre
function getScoresByGenre() {
  const uniqueGenres = getUniqueGenres();
  const scoresByGenre = {};

  // on obtient les scores de tous les animes correspondants pour chaque genre
  uniqueGenres.forEach((genre) => {
    scoresByGenre[genre] = animes
      .filter((anime) => anime.genres.includes(genre))
      .map((anime) => anime.score);
  });

  return scoresByGenre;
}

// on obtient les meilleurs genres d'animes en fonction de leur score moyen
function getTopGenres(top) {
  const scoresByGenre = getScoresByGenre();
  const sortedGenres = Object.entries(scoresByGenre)

  // on calcule la moyenne des scores des animes correspondants pour chaque genre
  .map(([genre, scores]) => ({
    genre,
    avgScore: scores.reduce((acc, score) => acc + score, 0) / scores.length,
  }))

  // on trie les genres par ordre décroissant de leur score moyen
  .sort((a, b) => b.avgScore - a.avgScore)
  .slice(0, top);
  
  // on retourne une liste des noms des meilleurs genres
  return sortedGenres.map(({ genre }) => genre);
}

// on instancie la fonction pour créer le graphique
function BarChart4() {

  // on utilise un state pour stocker les 3 meilleurs genres à afficher
  const [top, handleClick] = useState(3);
  const scoresByGenre = getScoresByGenre();

  // on obtient la liste des meilleurs genres
  const topGenres = getTopGenres(top);

  const series = Object.entries(scoresByGenre) // on prépare les données pour le graphique
  .filter(([genre]) => topGenres.includes(genre)) // on filtre les genres pour ne garder que les meilleurs
  .map(([genre, scores]) => ({
    name: genre,
    data: [scores.reduce((acc, score) => acc + score, 0) / scores.length],
  }));
  
  // on définis les options du graphique
  const options = {
    chart: {
      type: "bar",
      height: 550,
    },
    plotOptions: {
      bar: {
        horizontal: true,
        barHeight: 100,
      },
    },
    colors: ["#FF5733", "#33FF57", "#304758", "#C6FFDD", "#FF7F50", "#F7DC6F", "#7DCEA0", "#6C3483", "#F1C40F", "#3498DB"],
    dataLabels: {
      enabled: true,
      formatter: function (val) {
        return val.toFixed(2);
      },
      style: {
        fontSize: "14px",
        colors: ["#000000"],
      },
    },
    xaxis: {
      categories: topGenres,
      labels: {
        style: {
          fontSize: "14px",
          fontWeight: 600,
          colors: ["#ffffff"],
        },
      },
    },
    yaxis: {
      title: {
        text: "Score moyen",
        style: {
          fontSize: "14px",
          fontWeight: 600,
          colors: ["#ffffff"],
        },
      },
      labels: {
        style: {
          fontSize: "14px",
          colors: ["#000000"],
        },
      },
    },
    title: {
      text: "Scores moyens d'animes par genre",
      align: "center",
      style: {
        fontSize: "14px",
        fontWeight: "bold",
        color: "#ffffff",
      },
    },
    tooltip: {
      enabled: true,
      y: {
        formatter: function (val) {
          return val.toFixed(2);
        },
      },
    },
    responsive: [
      {
        breakpoint: 1024,
        options: {
          plotOptions: {
            bar: {
              horizontal: true,
              barHeight: 60,
            },
          },
        },
      },
      {
        breakpoint: 768,
        options: {
          plotOptions: {
            bar: {
              horizontal: true,
              barHeight: 40,
            },
          },
          xaxis: {
            labels: {
              rotate: -45,
            },
          },
        },
      },
    ],
  }; 

  // on affiche le graphique
  return (
    <div>
      <div className="filter-div">
        <label>Afficher les meilleurs genres d'animes du </label>
        <button onClick={() => handleClick(3)}> Top 3</button>
        <label> ou du </label>
        <button onClick={() => handleClick(10)}> Top 10</button>
      </div>
      <ApexCharts options={options} series={series} type="bar" height={550} />
    </div>
  );
}



// Septième graphique

// on récupère la liste des démographies dans la liste d'animes
function getUniqueDemographics() {
  const demographicsSet = new Set();
  animes.forEach((anime) => {
    anime.demographics.forEach((demographic) => demographicsSet.add(demographic));
  });
  return Array.from(demographicsSet);
}

// on récupère les scores d'animes par démographie
function getScoresByDemographic() {
  const uniqueDemographics = getUniqueDemographics();
  const scoresByDemographic = {};

  uniqueDemographics.forEach((demographic) => {
    scoresByDemographic[demographic] = animes
      .filter((anime) => anime.demographics.includes(demographic))
      .map((anime) => anime.score);
  });

  return scoresByDemographic;
}

// on calcule la distribution des scores
function calculateScoreDistribution(scores) {
  const distribution = Array(11).fill(0);
  scores.forEach((score) => {
    const index = Math.floor(score);
    distribution[index]++;
  });
  return distribution;
}

// on instancie la fonction pour le graphique
function StackedBarChart() {

  // on récupère les données nécessaires
  const uniqueDemographics = getUniqueDemographics();
  const scoresByDemographic = getScoresByDemographic();

  // on définis les options du graphique
  const options = {
    chart: {
      type: "bar",
      height: 550,
      stacked: true,
    },
    plotOptions: {
      bar: {
        horizontal: false,
      },
    },
    colors: ["#FF5733", "#33FF57", "#304758", "#C6FFDD", "#FF7F50", "#F7DC6F", "#7DCEA0", "#6C3483", "#F1C40F", "#3498DB"],
    title: {
      text: "Répartition des scores d'animes par démographie",
      align: "center",
      style: {
        fontSize: "14px",
        fontWeight: "bold",
        color: "#ffffff",
      },
    },
    xaxis: {
      categories: uniqueDemographics,
      style: {
        color: "#000000",
      },
    },
    yaxis: {
      title: {
        text: "Nombre d'animes",
        style: {
          fontSize: "14px",
          fontWeight: "bold",
          color: "#ffffff",
        },
      },
    },
    tooltip: {
      enabled: true,
    },
    responsive: [
      {
        breakpoint: 768,
        options: {
          chart: {
            height: 350,
          },
        },
      },
    ],
  };
  
  // on calcule les séries de données pour le graphique
  const series = Array.from({ length: 11 }, (_, i) => ({
    name: `${i}-${i + 0.9}`,
    data: uniqueDemographics.map(
      (demographic) => calculateScoreDistribution(scoresByDemographic[demographic])[i]
    ),
  }));

  // on affiche le graphique
  return (
    <ApexCharts options={options} series={series} type="bar" height={550} />
  );
}


// Huitième graphique 

// on calcule le nombre d'animes par saison de début
function getAnimeCountBySeason() {
  return animes.reduce((acc, anime) => {
    const season = anime.start_season;
    if (!season) {
      return acc;
    }
    if (!acc[season]) {
      acc[season] = 1;
    } else {
      acc[season]++;
    }
    return acc;
  }, {});
}

function VerticalBarChart() {

  // on récupère le nombre d'animes par saison
  const animeCountBySeason = getAnimeCountBySeason();
  // on récupère les catégories (les saisons de début)
  const categories = Object.keys(animeCountBySeason);
  // on récupère le nombre d'animes pour chaque catégorie
  const count = Object.values(animeCountBySeason);

  // on définis les options du graphique
  const options = {
    chart: {
      type: "bar",
      height: 550,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "50%",
        dataLabels: {
          position: "top",
        },
      },
    },
    colors: ["#FF5733", "#33FF57", "#304758", "#C6FFDD"],
    dataLabels: {
      enabled: true,
      offsetY: -50,
      style: {
        fontSize: "14px",
        colors: ["#304758"],
      },
      formatter: function(val) {
        return val;
      },
    },
    xaxis: {
      categories: categories,
      labels: {
        style: {
          fontSize: "14px",
          colors: ["#000"],
        },
        rotate: -45,
        trim: true,
        hideOverlappingLabels: true,
      },
      axisBorder: {
        show: true,
        color: "#999",
      },
      axisTicks: {
        show: true,
        borderType: "solid",
        color: "#999",
      },
    },
    yaxis: {
      title: {
        text: "Nombre d'animes",
        style: {
          fontSize: "14px",
          fontWeight: "bold",
          color: "#000",
        },
      },
      labels: {
        style: {
          fontSize: "14px",
          colors: ["#000"],
        },
      },
      axisBorder: {
        show: true,
        color: "#999",
      },
      axisTicks: {
        show: true,
        borderType: "solid",
        color: "#999",
      },
    },
    tooltip: {
      enabled: true,
    },
    responsive: [
      {
        breakpoint: 768,
        options: {
          chart: {
            height: 350,
          },
          dataLabels: {
            enabled: false,
          },
          xaxis: {
            labels: {
              rotate: 0,
            },
          },
        },
      },
    ],
  };
  
  // on définis la série de données à affichée
  const series = [
    {
      name: "Nombre d'animes",
      data: count,
    },
  ];

  // on affiche le graphique
  return (
    <div className="filter-div">
      <label>Afficher les animes par saison</label>
      <ApexCharts options={options} series={series} type="bar" height="550" />
    </div>
  );
}


// Neuvième graphique

// on calcule le nombre d'animes de chaque type (TV, OVA, Movie, etc.)
function getTypeCount() {
  return animes.reduce((acc, anime) => {
    const type = anime.type;
    if (!type) {
      return acc;
    }
    if (!acc[type]) {
      acc[type] = 1;
    } else {
      acc[type]++;
    }
    return acc;
  }, {});
}

// on instancie la fonction pour créer le graphique
function PieChart2() {

  // on récupère le nombre d'animes de chaque type
  const typeCount = getTypeCount();

  // on prépare les données du graphique
  const categories = Object.keys(typeCount);
  const count = Object.values(typeCount);

  // on définis les options du graphique
  const options = {
    chart: {
      type: "pie",
      height: 550,
    },
    labels: categories,
    legend: {
      show: true,
      position: "bottom",
      style: {
        color: ["ffffff"],
      },
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          legend: {
            position: "bottom",
          },
        },
      },
    ],
    colors: ["#FF5733", "#33FF57", "#304758", "#C6FFDD"],
    tooltip: {
      enabled: true,
    },
  };

  // on définis la série de données à affichée
  const series = count;

  // on affiche le graphique
  return (
    <div className="filter-div">
      <label>Répartition des types d'animes</label>
      <ApexCharts options={options} series={series} type="pie" height="550" />
    </div>
  );
}


// Dixième graphique

// on retourne le nombre d'animes par année
function getAnimeCountByYear() {

  return animes.reduce((acc, anime) => {
    const year = anime.start_year;

    // si l'année n'existe pas, on ne fait rien
    if (!year) {
      return acc;
    }

    // si l'année n'existe pas encore, on l'ajoute avec une valeur de 1
    if (!acc[year]) {
      acc[year] = 1;
    } else {

      // sinon on incrémente la valeur existante de 1
      acc[year]++;
    }
    return acc;
  }, {});
}

// on instancie la fonction pour créer le graphique
function AreaChart() {

  // on récupère le nombre d'animes par année
  const animeCountByYear = getAnimeCountByYear();

  // on récupère les années et le nombre d'animes correspondant sous forme de tableaux
  const categories = Object.keys(animeCountByYear);
  const count = Object.values(animeCountByYear);

  // on définis les options du graphique
  const options = {
    chart: {
      type: "area",
      height: 550,
    },
    dataLabels: {
      enabled: false,
    },
    colors: ["#FF5733"],
    xaxis: {
      categories: categories,
      labels: {
        style: {
          fontSize: "14px",
          colors: ["#000000"],
        },
        rotate: -45,
        trim: true,
        hideOverlappingLabels: true,
      },
      axisBorder: {
        show: true,
        color: "#ffffff",
      },
      axisTicks: {
        show: true,
        borderType: "solid",
        color: "#ffffff",
      },
    },
    yaxis: {
      title: {
        text: "Nombre d'animes",
        style: {
          fontSize: "14px",
          fontWeight: "bold",
          color: "#000000",
        },
      },
      labels: {
        style: {
          fontSize: "14px",
          colors: ["#000000"],
        },
      },
      axisBorder: {
        show: true,
        color: "#ffffff",
      },
      axisTicks: {
        show: true,
        borderType: "solid",
        color: "#ffffff",
      },
    },
    responsive: [
      {
        breakpoint: 1024,
        options: {
          chart: {
            height: 400,
          },
        },
      },
      {
        breakpoint: 768,
        options: {
          chart: {
            height: 300,
          },
          xaxis: {
            labels: {
              rotate: -90,
            },
          },
        },
      },
      {
        breakpoint: 576,
        options: {
          chart: {
            height: 200,
          },
          xaxis: {
            labels: {
              rotate: -90,
              offsetY: -5,
              offsetX: -10,
            },
          },
        },
      },
    ],
    tooltip: {
      enabled: true,
    },
    stroke: {
      curve: "straight",
    },
  };

  // on définis la série de données à affichée
  const series = [
    {
      name: "Nombre d'animes",
      data: count,
    },
  ];

  // on affiche le graphique
  return (
    <div className="filter-div">
      <label>Évolution du nombre d'animes par année</label>
      <ApexCharts options={options} series={series} type="area" height="550" />
    </div>
  );
}


// Onzième graphique

// on calcule la moyenne des épisodes des animes pour chaque année
function getAverageEpisodesByYear() {
  return animes.reduce((acc, anime) => {
    const year = anime.start_year;
    const episodes = anime.episodes;
    if (!year || !episodes) {
      return acc;
    }
    if (!acc[year]) {
      acc[year] = {
        count: 1,
        total: episodes,
      };
    } else {
      acc[year].count++;
      acc[year].total += episodes;
    }
    return acc;
  }, {});
}

// on calcule le nombre d'animes sortis chaque année
function getAnimeCountByYear2() {
  return animes.reduce((acc, anime) => {
    const year = anime.start_year;
    if (!year) {
      return acc;
    }
    if (!acc[year]) {
      acc[year] = 1;
    } else {
      acc[year]++;
    }
    return acc;
  }, {});
}

// on instancie la fonction pour créer le graphique
function BarChart3() {
  const averageEpisodesByYear = getAverageEpisodesByYear();
  const animeCountByYear = getAnimeCountByYear2();

  const years = Object.keys(animeCountByYear);

  // on crée un tableau contenant la moyenne d'épisodes par année
  const episodeAverages = years.map(
    (year) => averageEpisodesByYear[year].total / averageEpisodesByYear[year].count
  );

  // on crée un tableau contenant le nombre d'animes sortis chaque année
  const animeCounts = years.map((year) => animeCountByYear[year]);

  // on définis les options du graphique
  const options = {
    chart: {
      height: 550,
    },
    colors: ["#FF5733", "#33FF57"],
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: years,
      title: {
        text: "Année",
        style: {
          fontSize: "14px",
          colors: ["#ffffff"], 
        },
      },
      labels: {
        style: {
          fontSize: "14px",
          colors: ["#000000"],
        },
        rotate: -45,
        trim: true,
        hideOverlappingLabels: true,
      },
    },
    yaxis: [
      {
        seriesName: "Nombre d'épisodes moyens",
        title: {
          text: "Nombre d'épisodes moyens",
          style: {
            colors: ["#ffffff"],
          },
        },
      },
      {
        opposite: true,
        seriesName: "Nombre d'animes",
        title: {
          text: "Nombre d'animes",
          style: {
            colors: ["#ffffff"],
          },
        },
      },
    ],
    tooltip: {
      enabled: true,
    },
    responsive: [
      {
        breakpoint: 768,
        options: {
          chart: {
            height: 350,
          },
          dataLabels: {
            enabled: false,
          },
          xaxis: {
            labels: {
              rotate: 0,
            },
          },
        },
      },
    ],
  };

  // on définis la série de données à affichée
  const series = [
    {
      name: "Nombre d'épisodes moyens",
      data: episodeAverages,
    },
    {
      name: "Nombre d'animes",
      data: animeCounts,
    },
  ];

  // on affiche le graphique
  return (
    <div className="filter-div">
      <label>Moyenne et nombre d'épisodes des animes par année</label>
      <ApexCharts options={options} series={series} type="bar" height="550" />
    </div>
  );
}


// Douzième graphique

// on renvoie le nombre d'animes créés chaque année
function getAnimeCountByYear3() {
  return animes.reduce((acc, anime) => {
    const year = anime.start_year;
    if (!year) {
      return acc;
    }
    if (!acc[year]) {
      acc[year] = {
        animeCount: 1,
        scoredBy: anime.scored_by,
      };
    } else {
      acc[year].animeCount++;
      acc[year].scoredBy += anime.scored_by;
    }
    return acc;
  }, {});
}

// on instancie la fonction pour créer le graphique
function MixedChart() {

  // on récupère le nombre d'animes créés chaque année
  const animeCountByYear = getAnimeCountByYear3();

  // on extrait les années et le nombre d'animes retourné par la fonction getAnimeCountByYear3
  const years = Object.keys(animeCountByYear);
  const animeCounts = years.map((year) => animeCountByYear[year].animeCount);
  const scoredBy = years.map((year) => animeCountByYear[year].scoredBy);

  // on définis les options du graphique
  const options = {
    chart: {
      type: "line",
      height: 550,
    },
    stroke: {
      width: [0, 4],
      curve: "smooth",
    },
    plotOptions: {
      bar: {
        columnWidth: "50%",
      },
    },
    colors: ["#FF5733", "#33FF57"],
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: years,
      title: {
        text: "Année",
      },
      labels: {
        style: {
          fontSize: "14px",
          colors: ["#000"],
        },
        rotate: -45,
        trim: true,
        hideOverlappingLabels: true,
      },
    },
    yaxis: [
      {
        seriesName: "Nombre d'animes",
        title: {
          text: "Nombre d'animes",
        },
      },
      {
        opposite: true,
        seriesName: "Nombre de personnes ayant noté",
        title: {
          text: "Nombre de personnes ayant noté",
        },
      },
    ],
    responsive: [
      {
        breakpoint: 1024,
        options: {
          chart: {
            height: 400,
          },
        },
      },
      {
        breakpoint: 768,
        options: {
          chart: {
            height: 300,
          },
          xaxis: {
            labels: {
              rotate: -90,
            },
          },
        },
      },
      {
        breakpoint: 576,
        options: {
          chart: {
            height: 200,
          },
          xaxis: {
            labels: {
              rotate: -90,
              offsetY: -5,
              offsetX: -10,
            },
          },
        },
      },
    ],
    tooltip: {
      enabled: true,
    },
  };

  // on définis les séries de données à affichées
  const series = [
    {
      name: "Nombre d'animes",
      type: "column",
      data: animeCounts,
    },
    {
      name: "Nombre de personnes ayant noté",
      type: "line",
      data: scoredBy,
    },
  ];

  // on affiche le graphique
  return (
    <div className="filter-div">
      <label>Nombre d'animes sortis et nombre de personnes ayant noté chaque année</label>
      <ApexCharts options={options} series={series} type="line" height="550" />
    </div>
  );
}


// on affiche les douze graphiques dans le component AnimCharts

function AnimeComponent() {
  return (
    <div id="graph-container">
      <p className="titre">"Graphique de type BarChart pour représenter le top 3 ou le top 10 des meilleurs animes le mieux notés en fonction du score moyen et du nombre de personnes ayant noté chaque anime".</p>
      <BarChart />
      <p className="description">Le graphique représente le classement des animes les mieux notés en fonction de leur score moyen et du nombre de personnes ayant noté chaque anime. Les données ont été obtenues auprès d'un échantillon représentatif de personnes ayant visionné ces animés. Selon les résultats, le top 3 des meilleurs animes est le suivant : <br></br>
      <ul>
        <li>Kaguya-sama wa Kokurasetai, avec un score de 9.14, noté par X personnes.</li>
        <li>Fullmetal Alchemist: Brotherhood, avec un score de 9.13, noté par X personnes.</li>
        <li>Steins Gate, avec un score de 9.07, noté par X personnes.</li>
      </ul>
      Ce graphique montre que la note des animes ne sont pas en lien avec le nombre de votant. Le scrore est indépendant de celui-ci, ce qui donne donc en première place Kaguya-sama wa Kokurasetai qui a pourtant plus de 5 fois moins de participant que Fullmetal Alchemist: Brotherhood en 2ème place. Il est important de noter que ces résultats ne sont pas définitifs et peuvent varier en fonction de la taille de l'échantillon et des critères de sélection. Néanmoins, ils offrent une bonne indication des animes les mieux notés parmi les personnes ayant participé à cette enquête. 
      </p>
      <br></br>
      <p className="titre">"Graphique de type PieChart pour représenter le top 3 ou le top 10 des meilleures sources d'animes en fonction du nombre d'animes pour chaque source".</p>
      <PieChart />
      <p className="description">Le graphique représente le classement des meilleures sources d'animes en fonction du nombre d'animes proposés par chaque source. Les données ont été collectées auprès d'un échantillon représentatif de personnes s'intéressant aux animés. Selon les résultats, le top 3 des meilleures sources d'animes est le suivant : <br></br>
      <ul>
        <li>Manga, qui propose 60,8% du total des animes représentés dans l'enquête.</li>
        <li>Original, qui propose 20,6% du total des animes représentés dans l'enquête.</li>
        <li>Light novel, qui propose 18,6% du total des animes représentés dans l'enquête.</li>
      </ul>
      Ces résultats sont importants car ils donnent une indication sur les tendances de l'industrie de l'animation japonaise en matière d'adaptation. Les mangas sont de loin la source d'adaptation la plus populaire, ce qui n'est pas surprenant compte tenu de la popularité des mangas au Japon et dans le monde entier. En revanche, la deuxième place occupée par les créations originales est intéressante, car elle montre que les studios d'animation ne se limitent pas à l'adaptation de mangas ou de light novels, mais cherchent également à créer des œuvres originales. Enfin, la troisième place des light novels montre également l'importance de cette source d'adaptation dans l'industrie de l'animation japonaise. </p>
      <br></br>
      <p className="titre">"Graphique de type BarChart pour représenter le top 10 ou du top 20 des meilleurs animes ayant le plus grand nombre d'épisodes en fonction du nombre total d'épisodes pour chaque anime".</p>
      <BarChart2 />
      <p className="description">Le graphique représente le classement des meilleurs animes ayant le plus grand nombre d'épisodes en fonction du nombre total d'épisodes pour chaque anime. Les données ont été obtenues en recensant le nombre d'épisodes pour les animes populaires. Selon les résultats, le top 6 des animes ayant le plus grand nombre d'épisodes est le suivant : <br></br>
      <ul>
        <li>Doraemon, avec un total de 1787 épisodes.</li>
        <li>Naruto Shippuden, avec un total de 500 épisodes.</li>
        <li>Bleach, avec un total de 366 épisodes.</li>
        <li>Keroro Gunsou, avec un total de 358 épisodes.</li>
        <li>Dragon Ball Z, avec un total de 291 épisodes.</li>
        <li>Pokémon, avec un total de 276 épisodes.</li>
      </ul>
      Ces résultats montrent la popularité de ces animes auprès du public et leur durée de vie importante. Pour la première place, Doraemon est une série d'animation très populaire au Japon depuis de nombreuses années et est diffusée en continu depuis sa création en 1979, ce qui explique son nombre d'épisodes record. Pour les autres places du classement, Naruto, Bleach et Dragon Ball Z sont également des séries très populaires qui ont bénéficié d'une longue diffusion, alors que Keroro Gunsou est une série comique de science-fiction avec un nombre d'épisodes important. Enfin, Pokémon est une franchise très connue dans le monde entier qui a également connu une longue diffusion à travers plusieurs saisons et adaptations.</p>
      <br></br>
      <p className="titre">"Graphique de type LineChart pour représenter le nombres d'animés sortie par années".</p>
      <LineChart />
      <p className="description">Le graphique représente le nombre d'animes sortis par année au cours de la dernière décennie. Les données ont été obtenues en recensant les sorties d'animes populaires. Selon les résultats, le nombre d'animes sortis par année est le suivant :<br></br>
      <ul>
        <li>2010 : 103 animes</li>
        <li>2012 : 120 animes</li>
        <li>2013 : 131 animes</li>
        <li>2014 : 145 animes</li>
        <li>2015 : 143 animes</li>
        <li>2016 : 135 animes</li>
        <li>2017 : 128 animes</li>
        <li>2018 : 123 animes</li>
        <li>2019 : 116 animes</li>
        <li>2020 : 115 animes</li>
      </ul>
      Ces résultats montrent une tendance générale à la hausse du nombre d'animes sortis chaque année au cours de la dernière décennie. Cette croissance peut s'expliquer par l'augmentation de la demande pour les animes à travers le monde, ainsi que par la disponibilité de nouvelles plateformes de diffusion en ligne qui permettent aux fans d'anime d'accéder plus facilement à une grande variété de titres. Cependant, on note également une légère baisse du nombre d'animes sortis depuis le pic de 2014, ce qui peut s'expliquer par l'augmentation des coûts de production et de la concurrence sur le marché de l'animation.</p>
      <br></br>
      <p className="titre">"Graphique de type TreeMapChart pour représenter le top 3 ou le top 10 des meilleurs studio d'anime en fonction du nombre total d'animes pour chaque studio"</p>
      <TreeMapChart />
      <p className="description">Le graphique représente le classement des meilleurs studios d'anime en fonction du nombre total d'animes pour chaque studio. Les données ont été obtenues en recensant les studios de production des animes populaires. Selon les résultats, le top 3 des meilleurs studios d'anime est le suivant : <br></br>
      <ul>
        <li>Production I.G et J.C. Staff, avec tous les deux un total de 108 animes produits.</li>
        <li>Sunrise, avec un total de 101 animes produits.</li>
      </ul>
      Ces résultats montrent la forte présence de certains studios d'animation japonais dans l'industrie de l'anime. La première place partagée par Production I.G et J.C. Staff peut s'expliquer par leur production d'animes populaires tels que "Haikyu!!", "Psycho-Pass" ou "Fruits Basket" pour J.C. Staff et "Ghost in the Shell", "Kuroko's Basket" ou "Attack on Titan" pour Production I.G. Sunrise est également un studio de renom, ayant produit des classiques tels que "Gundam", "Cowboy Bebop" ou "Code Geass". Ces studios ont su gagner la confiance et la fidélité des fans d'anime en produisant des œuvres de qualité supérieure, en respectant les œuvres originales et en se concentrant sur l'innovation et l'originalité.</p>
      <br></br>
      <p className="titre">"Graphique pour représenter le top 3 ou le top 10 des meilleurs genres d'anime en fonction de la moyenne des scores obtenus par genre".</p>
      <BarChart4 />
      <p className="description">Le graphique représente le classement des meilleurs genres d'anime en fonction de la moyenne des scores obtenus par genre. Les données ont été obtenues en recensant les scores d'animes populaires dans chaque genre. Selon les résultats, le top 3 des meilleurs genres d'anime est le suivant : <br></br>
      <ul>
        <li>Award winning, avec une moyenne de score de 8,40 sur 10.</li>
        <li>Suspense, avec une moyenne de score de 7,92 sur 10.</li>
        <li>Sports, avec une moyenne de score de 7,90 sur 10.</li>
      </ul>
      Ces résultats montrent la popularité de certains genres d'animation japonais auprès du public, et leur capacité à offrir des œuvres de qualité supérieure. Le genre Award winning arrive en tête du classement, avec des animes populaires tels que "Your Name" (Kimi no Na Wa), "Spirited Away" (Le Voyage de Chihiro) ou "Akira". Le genre Suspense est également bien représenté, avec des animes populaires tels que "Death Note", "Psycho-Pass" ou "Monster". Le genre Sports complète le podium, avec des animes tels que "Haikyuu !!", "Kuroko no Basket" ou "Slam Dunk". Ces genres ont su captiver le public grâce à leur capacité à explorer des thèmes profonds et complexes, tout en offrant des intrigues captivantes et des personnages mémorables.</p>
      <br></br>
      <p className="titre">"Graphique pour représenter la répartition des scores d'animes par démographie, en fonction du nombre d'animes pour chaque score dans chaque catégorie démographique".</p>
      <StackedBarChart />
      <p className="description">Le graphique représente la répartition des scores d'animes par démographie en fonction du nombre d'animes pour chaque score dans chaque catégorie démographique. Les données ont été obtenues en analysant les scores d'animes populaires selon les différentes catégories démographiques. Selon les résultats, les trois catégories démographiques avec le plus grand nombre d'animes sont : <br></br>
      <ul>
        <li>Shounen, avec un total de 620 animes. Cette catégorie est principalement destinée à un public masculin adolescent et jeune adulte, et met souvent en scène des personnages masculins héroïques et des combats épiques.</li>
        <li>Seinen, avec un total de 258 animes. Cette catégorie est destinée à un public masculin adulte et met souvent en scène des histoires plus matures et réalistes avec des thèmes tels que la violence, la sexualité et la psychologie.</li>
        <li>Shoujo, avec un total de 131 animes. Cette catégorie est principalement destinée à un public féminin adolescent et jeune adulte, et met souvent en scène des histoires romantiques et dramatiques avec des personnages féminins forts.</li>
      </ul>
      Ces résultats montrent que la démographie cible peut exercer une grande influence sur le type d'anime produit et le public visé. Chacune de ces catégories démographiques peut avoir des attentes et des préférences différentes en matière d'anime, ce qui peut expliquer pourquoi certaines séries réussissent mieux que d'autres dans chaque catégorie. Enfin, la qualité des scores de chaque anime dans ces catégories suggère que les studios d'animation japonais fournissent un effort pour produire des séries de qualité qui répondent aux attentes de leur public cible.</p>
      <br></br>
      <p className="titre">"Graphique de type BarChart pour représenter le nombre total d'animes produits par saison en se basant sur les informations de saison de début de chaque anime".</p>
      <VerticalBarChart />
      <p className="description">Le graphique représente le nombre total d'animes produits par saison, en se basant sur les informations de saison de début de chaque anime. Selon les données recueillies, on peut observer une variation dans la production d'animes selon les saisons. Les mois de janvier, avril, juillet et octobre sont les plus populaires pour la sortie de nouveaux animes, avec respectivement 226, 259, 291 et 259 productions. Les mois de février, mars, mai, juin, août, septembre, novembre et décembre ont des productions moins importantes, avec respectivement 139, 141, 136, 153, 133, 139, 170 et 162 animes. Ces résultats peuvent être expliqués par la programmation des chaînes de télévision japonaises, qui diffusent plus d'animes durant ces saisons, et par le nombre de sorties de DVD/Blu-ray prévues à ces périodes.</p>
      <br></br>
      <p className="titre">"Graphique de type PieChart pour représenter la répartition des différents types d'animes".</p>
      <PieChart2 />
      <p className="description">Le graphique représente la répartition des différents types d'animes. Les données ont été obtenues en recensant les types d'animes populaires. Selon les résultats, les types d'animes les plus représentés sont les suivants : <br></br>
      <ul>
        <li>Série TV</li>
        <li>Film</li>
        <li>OVA (Original Video Animation)</li>
      </ul>
      Ces résultats montrent la diversité des types d'animes existants, et la popularité des séries TV en tant que format privilégié pour la production d'anime. Les films d'animation japonais ont également une forte présence, avec des œuvres telles que "Your Name", "Princesse Mononoké" ou "Le Voyage de Chihiro". Les OVA sont également populaires auprès du public, en offrant des histoires originales et des animations de qualité supérieure. Ce graphique permet de mieux comprendre les habitudes de consommation des fans d'anime et de mettre en lumière les types d'animes les plus populaires.</p>
      <br></br>
      <p className="titre">"Graphique de type AreaChart pour représenter l'évolution du nombre d'animes produits chaque année".</p>
      <AreaChart />
      <p className="description">Le graphique représente l'évolution du nombre d'animes produits chaque année, sur la base des données recueillies. Les résultats montrent une croissance régulière de l'industrie de l'anime au fil des années, avec une forte augmentation depuis les années 2000. Les années les plus prolifiques ont été 2016 et 2017, avec respectivement plus de 300 et 320 nouveaux animes produits. Le graphique illustre également une augmentation constante du nombre d'animes produits chaque année depuis les années 90, avec une moyenne d'environ 150 nouveaux animes par an au cours de cette période. Cette tendance à la hausse peut être due à l'augmentation de la popularité de l'anime dans le monde entier, ainsi qu'à la diversification des genres et des thèmes explorés dans les productions animées.</p>
      <br></br>
      <p className="titre">"Graphique de type BarChart pour représenter l'évolution du nombre d'épisodes moyens et du nombre total d'animes produits chaque année".</p>
      <BarChart3 />
      <p className="description">Le graphique représente l'évolution du nombre d'épisodes moyens et du nombre total d'animes produits chaque année. Les données ont été obtenues en recensant les épisodes et les années de production des animes populaires. Selon les résultats, la moyenne d'épisodes par anime a augmenté au fil des années, passant d'environ 22 épisodes en 2000 à près de 45 épisodes en 2020. Le nombre total d'animes produits a également augmenté au fil des ans, atteignant un pic en 2017 avec près de 450 animes produits. Ces résultats montrent l'importance de l'industrie de l'anime dans la culture populaire japonaise, ainsi que sa capacité à évoluer et à s'adapter aux changements du marché. L'augmentation du nombre d'épisodes moyens par anime peut être due à la demande croissante des fans pour des séries plus longues et plus approfondies. La croissance du nombre total d'animes produits peut être attribuée à la popularité croissante de l'anime dans le monde entier, ainsi qu'à l'augmentation des investissements dans l'industrie de l'animation.</p>
      <br></br>
      <p className="titre">"Graphique pour représenter l'évolution du nombre d'animes sortis et du nombre de personnes ayant noté chaque année".</p>
      <MixedChart />
      <p className="description">Le graphique représente l'évolution du nombre d'animes sortis chaque année ainsi que le nombre de personnes ayant noté ces animes. Les données ont été obtenues en recensant les animes populaires sortis chaque année ainsi que le nombre de personnes ayant noté ces animes. Selon les résultats, le nombre d'animes sortis chaque année a connu une croissance importante entre 2006 et 2017, passant d'environ 130 à plus de 300 sorties par an. Le nombre de personnes ayant noté ces animes a également augmenté de manière significative, passant d'environ 600 000 en 2006 à plus de 2 millions en 2017. Cette évolution montre l'importance croissante de l'animation japonaise dans la culture populaire, ainsi que l'intérêt grandissant du public pour ces œuvres.</p>
    </div>
  );
}

export default AnimeComponent;
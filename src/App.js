// ce fichier il n'y a pas besoin de modifier sauf si tu penses qu'il faut modifier quelque chose c'est dans App.css
// eslint-disable-next-line no-unused-vars
import './App.css';
import Home from "./Home";
import About from "./About";
import Graph from "./Graph";
import FooterPage from "./FooterPage";
import NavPage from "./NavPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


function App() {
  return (
    <Router>
      <div id="main-page">
        <NavPage />
          <Routes>
            <Route exact path="/" element={<Home/>} />
            <Route path="/graph" element={<Graph/>} />
            <Route path="/about" element={<About/>} />
          </Routes>
        <FooterPage />
      </div>
    </Router>
  );
}

export default App;


import React, { useState, useEffect } from "react";
import './Commun.css';

const AnimatedText = () => {
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const textToAnimate = "Avec AnimeStats, plongez dans l'univers envoûtant de l'animation japonaise et explorez ses aspects les plus captivants grâce à notre analyse approfondie et nos graphiques spectaculaires.";

  useEffect(() => {
    const intervalId = setInterval(() => {
      setText(textToAnimate.slice(0, index));
      setIndex(index => index + 1);
    }, 50);

    return () => clearInterval(intervalId);
  }, [index]);

  return <div className="animated-text">{text}</div>;
};

export default AnimatedText;
import React, { useState } from "react";
import array from "./assets/java-array.jpg";
import new_java from "./assets/new.png";
import equals from "./assets/equals.png";
import constructor from "./assets/constructor.png";
import { GrLinkNext } from "react-icons/gr";
import { GrLinkPrevious } from "react-icons/gr";

import "./App.css";

function App() {
  const cardSet = {
    title: "Java Basics Quiz",
    description: "Simple questions to test foundational Java knowledge.",
    cards: [
      {
        question: "What is the main method's purpose?",
        answer: "Program entry point.",
      },
      { question: "Which keyword defines a class?", answer: "class" },
      { question: "What's the default boolean value?", answer: "false" },
      {
        question: "Explain inheritance.",
        answer: "Code reusability (acquiring properties).",
      },
      {
        question: "Which data type stores a single character?",
        answer: "char",
      },
      {
        question: "What does the 'new' keyword do?",
        answer: "Create an object.",
        image: new_java,
      },
      {
        question: "What is an array?",
        answer: "Fixed-size collection of same-type elements.",
        image: array,
      },
      { question: "Which loop runs at least once?", answer: "do-while" },
      {
        question: "== vs .equals() for objects?",
        answer: "== compares references; .equals() compares content.",
        image: equals,
      },
      {
        question: "What is a constructor?",
        answer: "Initializes objects.",
        image: constructor,
      },
    ],
  };

  const [cardIndex, setCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const currCard = cardSet.cards[cardIndex];

  const handleCardClick = () => {
    setIsFlipped(!isFlipped);
  };

  const handleNextClick = () => {
    if (cardIndex === cardSet.cards.length - 1) {
      setCardIndex(0);
    } else {
      setCardIndex(cardIndex + 1);
    }
    setIsFlipped(false);
  };

  const handlePreviousClick = () => {
    if (cardIndex === 0) {
      setCardIndex(cardSet.cards.length - 1);
    } else {
      setCardIndex(cardIndex - 1);
    }
    setIsFlipped(false);
  };
  return (
    <div className="app-container">
      <h1>{cardSet.title}</h1>
      <p>{cardSet.description}</p>
      <p>Number of cards: {cardSet.cards.length}</p>

      <div className="flashcard-container" onClick={handleCardClick}>
        <div className={`flashcard ${isFlipped ? "flipped" : ""}`}>
          <div className="front">
            <p>{currCard.question}</p>
            <div className="question-image">
              <img src={currCard.image} alt="" />
            </div>
          </div>
          <div className="back">
            <p>{currCard.answer}</p>
          </div>
        </div>
      </div>

      <button className="button" onClick={handlePreviousClick}>
        <GrLinkPrevious />
      </button>

      <button className="button" onClick={handleNextClick}>
        <GrLinkNext />
      </button>
    </div>
  );
}

export default App;

import React, {useState} from 'react';
import './App.css';
import { Card } from './components/Card';
import { startGame } from './logic';

//need to have its own file 
import pidgey from "../src/pokemonsPics/pidgey.png";
import balbasurr from "../src/pokemonsPics/balbasurr.png";
import caterpie from "../src/pokemonsPics/caterpie.png";
import squirtle from "../src/pokemonsPics/squirtle.png";
import charmender from "../src/pokemonsPics/charmender.png";
import backgroundImg from "../src/pokemonsPics/pokemonBall.png"



function App() {
  const [cardData, setCardData] = useState([
    {id: 1, name: 'pidgey', imgSrc: pidgey ,visible: true},
    {id: 2, name: 'balbasurr', imgSrc: balbasurr,  visible: true},
    {id: 3, name: 'caterpie', imgSrc: caterpie, visible: true},
    {id: 4, name: 'squirtle', imgSrc: squirtle, visible: true},
    // {id: 5, name: 'charmender',imgSrc: charmender, visible: true},
    {id: 6, name: 'pidgey', imgSrc: pidgey ,visible: true},
    {id: 7, name: 'balbasurr', imgSrc: balbasurr,  visible: true},
    {id: 8, name: 'caterpie', imgSrc: caterpie, visible: true},
    {id: 9, name: 'squirtle', imgSrc: squirtle, visible: true},
    // {id: 10, name: 'charmender',imgSrc: charmender, visible: true},

  ])

  const [checkSet, setCheckSet] = useState([]);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);

  const handleStartGame = () => {
    startGame(setScore, setLives, setCardData, cardData);
  }

  if(checkSet.length > 1) {
    let cardOne = checkSet[0].name;
    let cardTwo = checkSet[1].name;

    //correct match
    if(cardOne === cardTwo) {
      console.log('found a match');
      setCheckSet([]);
      setScore(prev => prev + 1);
    } 

    //wrong match
    else {
      console.log('no match');
      setTimeout(() => {
        setLives(prev => {
          if(lives !== 0) {
            return prev-=1;
          }
        });
        setCardData(prev => {
          const resetMisMatched = prev.map((cardData) => {
            if(checkSet[0].id === cardData.id) {
              return {...cardData, visible: false}
            } 
            if(checkSet[1].id === cardData.id) {
              return {...cardData, visible: false}
            }
            else {
              return cardData;
            }
          })
  
          return resetMisMatched;
        })
        setCheckSet([]);
      }, 600)
    }
  }
  
  return (
    <div className="App" >
      <div>
        {lives > 0 ? <h3> your lives: {lives} </h3> : null }
        <h3> your score: {score} </h3>
      </div>  
      <button onClick={handleStartGame}> start game </button>  

      <div className='container'>
        {cardData.map((card) => {
          return (
            <Card 
              card={card} 
              checkSet={checkSet}
              setCheckSet={setCheckSet} 
              setCardData={setCardData}
              lives={lives}
            />
          )
        })}
      </div>     
    </div>
  );
}

export default App;

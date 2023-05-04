
export const generateNewRandomCardPosition = (cardslength) => {
    return Math.floor(Math.random() * cardslength); 
} 

export const randomiseCards = (setCardData, cardData) => {
    const usedNumbers = [];
    const newArray = [];

    let randomNumber = generateNewRandomCardPosition(cardData.length);
    for(let i = 0; i < cardData.length; i++) {
      if(usedNumbers.includes(randomNumber)) {  
        for(let i = 0; i < 100; i++) {
          randomNumber = generateNewRandomCardPosition(cardData.length);
          if(!usedNumbers.includes(randomNumber)) {
            usedNumbers.push(randomNumber);
            newArray.push(cardData[randomNumber]);  
            break;
          } else {
            continue;
          }
        }
      } 
      else {
        usedNumbers.push(randomNumber);
        console.log(cardData[randomNumber], ' < random card');
        // let cardDataReset = {...cardData[randomNumber], visible: true};
        newArray.push(cardData[randomNumber]);
      } 
    }

    let cardDataWithVisiblityTrue = newArray.map((card) => {
      return {...card, visible: true};
    })

    setCardData(cardDataWithVisiblityTrue);    
}

export const startGame = async (setScore, setLives, setCardData, cardData) => {
    setScore(0);
    setLives(3);

    const revealCardsPromise = () => new Promise((resolve, reject) => 
    {
      setTimeout(() => {
        console.log('revealing')
        resolve(setCardData(prev => {
          const revealCards = prev.map((card) => {
            return {...card, visible: true};
          })
          return revealCards;
        }))
        reject('error with revealign cards');
      }, 10)
    })

    const shuffleCards = () => new Promise((resolve, reject) => 
    {
      setTimeout(() => {
        console.log('shuffling');
        resolve(randomiseCards(setCardData, cardData));
        reject('error with shuffling cards');
      }, 400);
    })

    const hideCardsPromise = () => new Promise((resolve, reject) => 
    {
      setTimeout(() => {
        console.log('hiding');
        resolve(
          setCardData(prev => {
          const hideCards = prev.map((card) => {
            return {...card, visible: false};
          })
          return hideCards;
          })
        )
        reject('error with hiding cars');
      }, 3000)
    })
    
    await revealCardsPromise();
    await shuffleCards();
    await hideCardsPromise();
  
}


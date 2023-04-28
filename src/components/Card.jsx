import React, {useState} from "react";

export const Card = (props) => {
    // const [isVisible, setIsVisible] = useState(true);

    const hanleFlipCard = () => {
        if(!props.card.visible && props.lives !== 0) {
            props.setCardData(prev => {
                const copy = prev.map((card) => {
                    if(card.id === props.card.id) {
                        return {...card, visible: !card.visible};
                    } else {
                        return card;
                    }
                })
                return copy;
            })
    
            props.setCheckSet(prev => [...prev, {...props.card}]);
        } 
    }

    return (
        <div className="card" id={props.card.visible ? "card-visible" : "card-hidden"} onClick={hanleFlipCard}>
            {/* <h1> {props.card.name} </h1> */}
            <img src={props.card.imgSrc} alt={props.card.name}/>
        </div>
    )
}
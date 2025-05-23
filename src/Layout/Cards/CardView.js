import {useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import React from "react";

export const CardView = ({cards}) => {
    const {deckId} = useParams();
    const [index, setIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);
    const navigator = useNavigate();

    const flipFace = () => {
        setIsFlipped(!isFlipped);
    }

    const nextCard = () => {
        setIndex(index + 1);
        setIsFlipped(false);
        if (index === cards.length - 1){
            if (window.confirm("Restart Cards? \n\nClick 'cancel' to return to the home page.")){
                setIndex(0);
            } else {
                navigator("/");
            }
        }
    }
    if (cards){
        if (cards.length < 3){
            return (
                <>
                    <h3>Not enough cards.</h3>
                    <p>You need at least 3 cards to study. There are {cards.length} in this deck.</p>
                    <Link to={`/decks/${deckId}/cards/new`} className='button-link add'>Add Cards</Link>
                </>
            )
        }
        return (
            <div className="list-deck-item">
                <h4>Card {index+1} of {cards.length}</h4>
                <p>{isFlipped ? cards[index].back : cards[index].front}</p>
                <button onClick={flipFace} className="button-link flip">Flip</button>
                { isFlipped && <button onClick={nextCard} className="button-link next">Next</button>}
            </div>
        )
    }
}

export default CardView;
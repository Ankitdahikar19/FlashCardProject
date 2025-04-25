import Header from "../Header";
import {Link, useNavigate, useOutletContext, useParams} from "react-router-dom";
import {deleteDeck, readDeck} from "../../utils/api";
import DeckViewList from "./DeckViewList";
import './DeckView.css'
import React from "react";

export const DeckView = () => {
    const navigate = useNavigate();
    const { deck } = useOutletContext(); // Access shared deck state

    const handleDeckDelete = (e) => {
        e.preventDefault();
        if (window.confirm('Delete this deck?\n\n You will not be able to recover it.')){
            const abortController = new AbortController();
            deleteDeck(deck.id, abortController.signal).then(response =>{
                console.log(`Deleted ${deck.id} Successfully!!`)
                navigate("/");
            }).catch(
                error => console.log(error)
            )
        }
    }

    return(
        <>
            <Header/>
            <div className="container">
                <nav>
                    <Link to='/'>Home</Link> /
                    {deck.name}
                </nav>
                <h2>{deck.name}</h2>
                <p>{deck.description}</p>

                <div className="list-deck-item-links-container">
                    <div className="left-links">
                        <Link to={`edit`} className='button-link edit'>Edit </Link>
                        <Link to={`/decks/${deck.id}/study`} className='button-link study'>Study </Link>
                        <Link to={`/decks/${deck.id}/cards/new`} className='button-link add'>Add Cards </Link>
                    </div>
                    <div className="right-links">
                        <button onClick={handleDeckDelete} className='button-link delete'>Delete</button>
                    </div>
                </div>
                <br/>
                <div>
                    <DeckViewList cards={deck.cards}/>
                </div>
            </div>
        </>
    )

}

export default DeckView;
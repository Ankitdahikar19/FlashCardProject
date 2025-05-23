import {Link, useNavigate, useParams} from "react-router-dom";
import Header from "../Header";
import {useEffect, useState} from "react";
import {readCard, readDeck, updateCard, updateDeck} from "../../utils/api";
import CardForm from "./CardForm";
import React from "react";

export const EditCardInDeck = () => {
    const {deckId, cardId} = useParams();
    const [deck, setDeck] = useState({})
    const navigate = useNavigate();
    const [formData, setFormData] = useState({})

    useEffect(() => {
        const abortController = new AbortController();
    
        async function fetchData() {
            try {
                const [deckData, cardData] = await Promise.all([
                    readDeck(deckId, abortController.signal),
                    readCard(cardId, abortController.signal),
                ]);
                setDeck(deckData);
                setFormData(cardData);
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
        return () => abortController.abort();
    }, [deckId, cardId]);    

    const handleCardChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    const handleCardSubmit = (e) => {
        e.preventDefault();
        const abortController = new AbortController();
        updateCard(formData, abortController.signal).then(response => {
            navigate(`/decks/${deckId}`);
            navigate(0);
        }).catch(
            error => console.log(error)
        )
        return () => abortController.abort();
    }

    return(
        <>
            <Header/>
            <div className="container">
                <nav>
                    <Link to='/'>Home</Link> /
                    <Link to={`/decks/${deckId}`}>{deck.name}</Link> /
                    Edit Card {cardId}
                </nav>
                <p>DeckId: {deckId} and Card: {cardId}</p>
                <h2>Edit Card</h2>
                <CardForm
                    handleCardSubmit = {handleCardSubmit}
                    formData={formData}
                    handleCardChange={handleCardChange}
                    deckId={deckId}>
                </CardForm>
            </div>
        </>

    )
}

export default EditCardInDeck;
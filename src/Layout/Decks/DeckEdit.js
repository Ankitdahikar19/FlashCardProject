import {Link, useNavigate, useOutletContext, useParams} from "react-router-dom";
import Header from "../Header";
import {useEffect, useState} from "react";
import { updateDeck } from "../../utils/api";
import React from "react";

export const DeckEdit = () => {
    const { deck } = useOutletContext(); // Access shared deck state
    const navigate = useNavigate();
    const [formData, setFormData] = useState({})

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const abortController = new AbortController();
        updateDeck(formData, abortController.signal).then(response => {
            navigate(`/decks/${response.id}`);
            navigate(0);
        }).catch(
            error => console.log(error)
        )
        return () => abortController.abort();
    }

    useEffect( () => {
        setFormData(deck);
    }, [deck]);
    return(
        <>
            <Header/>
            <div className="container">
                <nav>
                    <Link to='/'>Home</Link> /
                    <Link to={`/decks/${deck.id}`}>{deck.name}</Link> /
                    Edit Deck
                </nav>
                <form onSubmit={handleSubmit}>
                    <label htmlFor='name'>
                        Name
                        <br/>
                        <input type='text' id='name' name='name' size='50'
                               onChange={handleChange} value={formData.name}/>
                    </label>
                    <br/>
                    <br/>
                    <label htmlFor='description'>
                        Description
                        <br/>
                        <textarea id='description' name='description' rows="5" cols="50"
                                  onChange={handleChange} value={formData.description}/>
                    </label>
                    <div>
                        <button type='reset' onClick={() => navigate(`/decks/${deck.id}`)} className='button-link cancel'>Cancel</button>
                        <button type='submit' className='button-link submit'>Submit</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default DeckEdit;
import Header from "../Header";
import {Link, useOutletContext, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {readDeck} from "../../utils/api";
import CardView from "../Cards/CardView";
import React from "react";

export const DeckStudy = () => {
    const { deck } = useOutletContext(); // Access shared deck state

    return (
        <>
            <Header></Header>
            <div className="container">
                <nav>
                    <Link to='/'>Home</Link> /
                    <Link to={`/decks/${deck.id}`}>{deck.name}</Link> /
                    Study
                </nav>
                <h2>Study: {deck.name}</h2>
                <CardView cards={deck.cards}></CardView>
            </div>
        </>
    )
}

export default DeckStudy;
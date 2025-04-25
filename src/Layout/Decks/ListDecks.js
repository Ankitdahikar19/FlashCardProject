import ListDeckItem from "./ListDeckItem";
import React from "react";

export const ListDecks = ({decks}) => {
    console.log("Decks In DB: ", decks);
    return (
        <div>
            {decks.map((deck, index) => (
                <ListDeckItem deck={deck} />
            ))}
        </div>
    )
}

export default ListDecks;
import {Route, Routes} from "react-router-dom";
import Layout from "./Layout";
import NotFound from "./Layout/NotFound";
import DeckStudy from "./Layout/Decks/DeckStudy";
import DeckView from "./Layout/Decks/DeckView";
import CreateNewDeck from "./Layout/Decks/CreateNewDeck";
import DeckEdit from "./Layout/Decks/DeckEdit";
import AddCardToDeck from "./Layout/Cards/AddCardToDeck";
import EditCardInDeck from "./Layout/Cards/EditCardInDeck";
import React from "react";
import DeckManager from "./Layout/Decks/DeckManager";

export const RootRoutes = () => {
    return(
        <Routes>
            <Route path='/' element={<Layout />}></Route>
            <Route path='/decks/:deckId' element={<DeckManager />}>
                <Route index element={<DeckView />} />
                <Route path='edit' element={<DeckEdit />} />
                <Route path='cards/new' element={<AddCardToDeck />} />
                <Route path='cards/:cardId/edit' element={<EditCardInDeck />} />
                <Route path='study' element={<DeckStudy />} />
            </Route>
            <Route path='decks/new' element={<CreateNewDeck />} />
            <Route path='*' element={<NotFound />} />
        </Routes>
    )
}

export default RootRoutes
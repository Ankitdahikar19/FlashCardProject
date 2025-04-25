import React, { useState, useEffect } from 'react';
import { useParams, Outlet } from 'react-router-dom';
import { readDeck } from '../../utils/api'; // Import the API function

const DeckManager = () => {
    const { deckId } = useParams(); // Get the deckId from URL
    const [deck, setDeck] = useState();

    useEffect(() => {
        const fetchDeck = async () => {
            try {
                const fetchedDeck = await readDeck(deckId);
                setDeck(fetchedDeck);

                } catch (error) {
                    console.error('Failed to fetch deck:', error);
                }
        };
        fetchDeck();
        }, [deckId]);

    if (!deck) {
        return <div>Loading...</div>;
    }
    return (
        <div>
        <Outlet context={{ deck, setDeck }} /> {/* Provide deck and setDeck to children */}
        </div>
    );
}

export default DeckManager;

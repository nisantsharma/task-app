import { createContext, useState } from 'react';

export const DataContext = createContext();


const DataProvider = ({ children }) => {
    const [checklistArr, setChecklistArr] = useState([]);
    const [cardsArr, setCardsArr] = useState([]);


    return (
        <DataContext.Provider value={{ checklistArr, setChecklistArr, cardsArr, setCardsArr }} >
            {children}
        </DataContext.Provider>
    )
}

export default DataProvider;

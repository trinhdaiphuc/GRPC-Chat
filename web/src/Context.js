import React, {createContext, useReducer} from "react";
import Reducer from "./Reducer";

const initialState = {
    type: "",
    messages: [],
};

export const GlobalContext = createContext(initialState);

const ReactContext = ({children}) => {
    const [state, dispatch] = useReducer(Reducer, initialState);

    const addMessages = (message) => {
        dispatch({
            type: "ADD_MESSAGE",
            payload: message,
        });
    };

    return (
        <GlobalContext.Provider value={{messages: state.messages, addMessages}}>
            {children}
        </GlobalContext.Provider>
    )
}

export default ReactContext;

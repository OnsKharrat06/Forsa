import React from "react"
import { useState } from "react";
export const userContext = React.createContext();

export const UserContextProvider = props => {
    const [user, setUser] = useState();
    const context = {user, setUser};
    return (
      <userContext.Provider value={context}>
        {props.children}
      </userContext.Provider>
    );
  };


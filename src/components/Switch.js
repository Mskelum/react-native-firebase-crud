import React, { useState, createContext } from 'react';

export const SwitchContext = createContext({
    isEnabled: false,
    toggleSwitch: () => { },
});

export const SwitchProvider = ({ children }) => {
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    return (
        <SwitchContext.Provider value={{ isEnabled, toggleSwitch }}>
            {children}
        </SwitchContext.Provider>
    );
};

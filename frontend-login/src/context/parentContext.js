import React, { createContext, useState } from 'react'

const contextBlock = createContext();

export const ParentContext = (props) => {
    return (
        <contextBlock.Provider value={{}}>
            {props.children}
        </contextBlock.Provider>
    )
}

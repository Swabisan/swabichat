import React from "react";

import "./Chip.css"

export const Chip = ({ children }: React.PropsWithChildren<React.InputHTMLAttributes<HTMLButtonElement>>) => {
    return <button>{ children }</button>
};

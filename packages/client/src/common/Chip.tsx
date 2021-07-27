import React from "react";

import "./Chip.css"

interface Props {
    onClick?: (value: string) => void
}

export const Chip = ({ children, onClick }: React.PropsWithChildren<Props>) => {
    return (
        <div
            className="chip"
            onClick={(e: any) => {
                onClick?.(e.target.innerText as string)
            }}
        >
            {children}
        </div>
    )
};

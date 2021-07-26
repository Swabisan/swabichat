import React, { PropsWithChildren } from "react";

interface Props {
    className?: string
    isInput?: boolean
}

const EditableHeader = ({ children, className, isInput }: PropsWithChildren<Props>) => {
    if (isInput) {
        return <input className={className} type="text" />
    }

    return <ul className={className}>
        { children }
    </ul>
};

export default EditableHeader;
import React, { PropsWithChildren } from "react";

interface Props {
    className?: string
    isInput?: boolean
}

const EditableBody = ({ children, className, isInput }: PropsWithChildren<Props>) => {
    if (isInput) {
        return <textarea className={className} />
    }

    return < p className={className} >
        {children}
    </p >
};

export default EditableBody;
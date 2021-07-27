import React, { Dispatch, SetStateAction, useState } from "react";

import { Chip } from "../common";

interface Props {
    className?: string
    useState?: [string[], Dispatch<SetStateAction<string[]>>]
    to?: string[]
}

const Recipients = ({ className, useState: useOtherState, to }: Props) => {
    const [state, setState] = useState<string[]>([])
    const [recipients, setRecipients] = useOtherState || [state, setState]

    const push = (to: string) => {
        if (to && !recipients.includes(to)) setRecipients([...recipients, to].sort())
    }

    const pop = () => {
        const [, ...remaining] = [...recipients].reverse()
        setRecipients([...remaining].reverse())
    }

    return (
        <form className={className} onSubmit={(e) => {
            e.preventDefault()

            push(e.target[0].value)

            e.target[0].value = ''
        }}>
            <span className="title">To: </span>
            {recipients.map((name, index: number) =>
                <Chip
                    key={index}
                    onClick={(value: any) => {
                        setRecipients(recipients.filter((to: string) => (value !== to)))
                    }}
                >
                    {name}
                </Chip>
            )}
            <input
                type="text"
                onKeyDown={(e: any) => {
                    switch (e.key) {
                        case "Backspace":
                            if (e.target.value) return
                            /* falls through */
                        case "Delete":
                            pop()
                            return
                    }
                }}
                onBlur={(e) => {
                    push(e.target.value)

                    e.target.value = ''
                }}
                placeholder="add a name"
            />
            {recipients.length === 0 ? <span className="required">(required)</span> : null}
        </form>
    )
}

export default Recipients
import React from "react";
import { Message as MessageProps } from "@prisma/client";

import Message from "./Message";

interface Props {
    messages?: MessageProps[]
}

const Messages = ({ messages }: Props) => {
    return (
        <div className="messages">
            {messages?.length === 0 ? "no messages..." : "feed"}
            {messages?.map(
                (message, index) =>
                    <div key={index}>
                        <Message message={message} />
                    </div>
            )?.reverse()}
        </div>
    )
};

export default Messages;

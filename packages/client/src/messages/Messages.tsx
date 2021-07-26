import React, { useEffect } from "react";

import Message from "./Message";

interface Props {
    messages?: any[]
}

const Messages = ({ messages }: Props) => {
    return (
        <div className="messages">
            <Message />

            {messages?.length === 0 ? "No Messages..." : "Recieved: "}
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

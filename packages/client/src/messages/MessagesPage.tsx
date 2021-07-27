import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {
    useQuery,
    gql,
    useSubscription
} from "@apollo/client";
import { Message as MessageProps } from "@prisma/client";

import Messages from "./Messages";
import SendMessage from "./SendMessage";

const MESSAGES = gql`
    query($to: [String!], $from: String) {
        messages(to: $to, from: $from) { 
            to {
                name
            }
            author
            body
            createdAt
        }
    }
`

const ON_NEW_MESSAGE = gql`
    subscription($to: String!) {
        onNewMessage(to: $to) {
            to {
                name
            }
            author
            body
            createdAt
        }
    }
`

const MessagesPage = () => {
    const [messages, setMessages] = useState<MessageProps[]>([])

    const { username } = useParams<{ username: string }>();

    const query = useQuery<{ messages: MessageProps[] }>(MESSAGES, {
        variables: { to: [username], from: username },
        onCompleted: ({ messages }) => {setMessages(messages)}
    })

    const subscription = useSubscription(ON_NEW_MESSAGE, {
        variables: { to: username },
        onSubscriptionData: ({ subscriptionData: { data: { onNewMessage } } }) => {
            setMessages([...messages, onNewMessage])
        }
    })

    if (query.loading) return <span>Loading...</span>

    return (
        <div className="messagesPage">
            <div className="info">
                {subscription.error ? <span>{subscription.error.message}</span> : null}
                {query.error ? <span>{query.error.message}</span> : null}
            </div>
            <SendMessage onSubmit={(sent: MessageProps) => {
                setMessages([...messages, sent])
            }} />
            <Messages messages={messages} />
        </div>
    )
};

export default MessagesPage;
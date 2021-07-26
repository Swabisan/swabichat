import React from "react";
import { useParams } from "react-router-dom";
import {
    useQuery,
    gql,
    useSubscription
} from "@apollo/client";

import Messages from "./Messages";

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
    const { username } = useParams<{ username: string }>();

    const { loading, error, data, subscribeToMore } = useQuery<{ messages: any }>(MESSAGES, { variables: { to: [username] } })

    const subscription = useSubscription(ON_NEW_MESSAGE, { variables: { to: username } })

    console.log(subscription)

    if (loading) return <span>Loading...</span>

    if (error) return <span>{error.message}</span>

    return (
        <Messages messages={[...data?.messages, subscription.data?.onNewMessage]} />
    )
};

export default MessagesPage;
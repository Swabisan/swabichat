import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { gql, useMutation } from '@apollo/client';
import { Message as MessageProps } from "@prisma/client";

import Recipients from './Recipients';

import "./Message.css"

const SEND = gql`
    mutation($to: [String!]!, $from: String!, $body: String!) {
        send(to: $to, from: $from, body: $body) {
            to {
                name
            }
            author
            body
            createdAt
        }
    }
`

interface Props {
    onSubmit?: (sent: MessageProps) => void
}

const Message = ({ onSubmit }: Props) => {
    const [recipients, setRecipients] = useState<string[]>([]);
    const [send, { loading, error, data }] = useMutation<{ send: MessageProps }>(SEND, {
        onCompleted: ({ send }) => {
            onSubmit?.(send)
        }
    });

    const { username } = useParams<{ username: string }>();

    const canSend = Boolean(recipients.length > 0 && username)

    return (
        <div className="message">
            <div className="from">
                <span className="title">From: </span>
                {username}
            </div>
            <Recipients className="to" useState={[recipients, setRecipients]} />
            <hr />
            <form
                className="body"
                onSubmit={(e) => {
                    e.preventDefault()
                    const body = e.target[0].value
                    if (canSend) {
                        send({
                            variables: {
                                to: recipients,
                                from: username,
                                body
                            }
                        })
                    }
                }}
            >
                <textarea placeholder="write a message" />
                <br />
                <button disabled={!canSend}>send</button>
            </form>
            <div className="info">
                {loading ? <span>loading...</span> : null}
                {error ? <span>{error.message}</span> : null}
                {data ? <span>sent!</span> : null}
            </div>
        </div>
    )
};

export default Message;
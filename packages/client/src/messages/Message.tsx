import React from 'react';
import { useParams } from 'react-router-dom';
import { gql, useMutation } from '@apollo/client';
import { Message as MessageProps } from "@prisma/client";

import { Chip } from '../common';
import EditableBody from "./EditableBody"
import EditableHeader from './EditableHeader';

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
    message?: MessageProps & { to?: { name: string }[], from?: { name: string }[] }
}

const Message = ({ message }: Props) => {
    const isInput = message == null;
    const [send, {loading, error, data}] = useMutation<{ message: any}>(SEND);

    const { username } = useParams<{ username: string }>();

    return (
        <div className="message">
            <span className="from"><span className="title">From: </span>{isInput ? username : message?.author}</span>
            <EditableHeader className="to" isInput={isInput} >
                <span className="title">To: </span>{message?.to?.map((user, index: number) => <Chip key={index}>{user.name}</Chip>)}
            </EditableHeader>
            <hr />
            <EditableBody className="body" isInput={isInput} >
                {message?.body}</EditableBody>
        </div>
    )
};

export default Message;
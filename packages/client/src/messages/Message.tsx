import React from 'react';
import moment from 'moment';
import { Message as MessageProps } from "@prisma/client";

import { Chip } from '../common';

import "./Message.css"

interface Props {
    message?: MessageProps & { to?: { name: string }[], from?: { name: string }[] }
}

const Message = ({ message }: Props) => {
    return (
        <div className="message">
            <div className="from">
                <span className="title">From: </span>
                {message?.author}
            </div>
            <div className="to">
                <span className="title">To: </span>
                {message?.to?.map((user, index: number) =>
                    <Chip key={index}>{user.name}</Chip>
                )}
            </div>
            <hr />
            <p className="body">
                {message?.body}
            </p>
            <div className="when">
                <span>{moment(message.createdAt).fromNow()}</span>
            </div>
        </div>
    )
};

export default Message;
import MsgBox from "./MsgBox"
import styles from './chat.module.css';
import { useEffect, useRef, useState } from "react";
import { Socket } from "socket.io-client";

type Props = {
	socket: Socket
	userid: string
}

export enum MessageType {
	Text = 'text'
}

export interface Message {
	id: number
	userid: string
	username: string
	profilePicture: string
	type: MessageType
	data: string
	time: number
}

export default function ChatLog({ socket, userid }: Props) {

	const [messages, setMessages] = useState<Message[]>([]);
	const list = useRef<HTMLDivElement>(null);

	// On other message sent
	useEffect(() => {
		socket.on('other_sent', (data: Message) => {
			setMessages(current=>[...current, { ...data	}])
		})
		return () => {socket.off('other_sent')}
	}, [socket])

	// On chat log is received.
	useEffect(() => {
		socket.on('chat_log', (data: Message[]) => {
			setMessages(data)
		})
		return () => {socket.off('chat_log')}
	}, [socket])

	// On new message added
	useEffect(() => {
		list.current?.lastElementChild?.scrollIntoView();
	}, [messages])

	return <>
		<div className={styles.log} ref={list}>
			{messages.map(msg => {
				return (<MsgBox key={msg.time} msg={msg} righted={(msg.userid == userid)} />)
			})}
		</div>
	</>;
}
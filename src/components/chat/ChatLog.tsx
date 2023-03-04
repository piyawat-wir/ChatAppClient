import MsgBox from "./MsgBox"
import styles from './chat.module.css';
import { useEffect, useRef, useState } from "react";

type Props = {
	room: string,
	username: string
}

export type Message = ReturnType<typeof makeMessage>

let timeOffset = 0
const makeMessage = (text: string, user: string) => (
	{ text, user, time: Date.now() + (timeOffset += 1700) }
)

const user = {
	a: "Red Dum",
	b: "Bored_fox",
}

const hardMakeMessages = () => [
	makeMessage("Hello!! >W<", user.a),
	makeMessage("AGRHHHHHHHHHHHHH!!!!!!!!11+", user.b),
	makeMessage("watt?", user.a),
	makeMessage("me ded", user.b),
	makeMessage("goodbye world~", user.b),
	makeMessage(".-.", user.a),
	makeMessage("ummmmm...", user.a),
	makeMessage("u good?", user.a),
	makeMessage("101011100001101000011010101010100001111110100010110100110", user.b),
	makeMessage("boop Beep!! Bop~ bOoop!", user.b),
	makeMessage(".=.", user.a),
];

export default function ChatLog({ room, username }: Props) {

	const [messages, setMessages] = useState<Message[]>([]);
	const list = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const messages = hardMakeMessages();
		setMessages(messages);
	}, [])

	useEffect(() => {
		list.current?.lastElementChild?.scrollIntoView();
	}, [messages])

	return <>
		<div className={styles.log} ref={list}>
			{messages.map(msg => {
				return (<MsgBox key={msg.time} msg={msg} righted={(msg.user == user.a)} />)
			})}
		</div>
	</>;
}
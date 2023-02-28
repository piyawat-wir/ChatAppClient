import Image from "next/image";
import { Message } from "./ChatLog";

import styles from './chat.module.css';

const ProfilePicture: Record<string, string> = {
	reddumb: '/img/prof1.png',
	boredfox: '/img/prof2.png',
}

type Prop = {
	msg: Message,
	righted: boolean
}

const profmap: Record<string, string> = {
	'Red Dum': 'reddumb',
	'Bored_fox': 'boredfox',
}

export default function MsgBox({ msg, righted }: Prop) {

	const profpic = ProfilePicture[profmap[msg.user]];

	return <div className={`${styles.msg} ${(righted)?styles.right:''}`}>
		<Image src={profpic} alt={profmap[msg.user]}
			width={100} height={100} priority
		/>
		<div className={styles.content}>
			<div className={styles.name}>{msg.user}</div>
			<div className={styles.msgcontainer}>
				<p>{msg.text}</p>
			</div>
			<time>{new Date(msg.time).toLocaleTimeString()}</time>
		</div>
	</div>;
}
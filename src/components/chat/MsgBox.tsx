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

export default function MsgBox({ msg, righted }: Prop) {

	const profpic = ProfilePicture[msg.profilePicture];

	return <div className={`${styles.msg} ${(righted)?styles.right:''}`}>
		<Image src={profpic} alt={msg.profilePicture}
			width={100} height={100} priority
		/>
		<div className={styles.content}>
			<div className={styles.name}>{msg.username}</div>
			<div className={styles.msgcontainer}>
				<p>{msg.data}</p>
			</div>
			<time>{new Date(msg.time).toLocaleTimeString()}</time>
		</div>
	</div>;
}
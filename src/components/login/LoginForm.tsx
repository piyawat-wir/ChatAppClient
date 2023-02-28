import { ChangeEvent, useEffect, useState } from "react"
import styles from './LoginForm.module.css'

export default function LoginForm() {

	const [username, setUsername] = useState('');
	const [roomCode, setRoomCode] = useState('');

	return (<div style={{display: 'flex', justifyContent: 'center', flexDirection: 'column'}}>
		<div className={styles.container}>
			<div><h1>🐈‍⬛ChatCat</h1></div>
			<div className={styles.fieldBox}>
				<input type='text'
					placeholder="Username"
					onChange={e => setUsername(e.target.value)}
				/>
			</div>
			<div className={styles.fieldBox}>
				<input type='text'
					placeholder="Room code"
					onChange={e => setRoomCode(e.target.value)}
				/>
			</div>
			<div className={styles.buttons}>
				<button className={styles.createBtn}>Create Room</button>
				<button className={styles.joinBtn}>Join</button>
			</div>
		</div>
	</div>)
}
import { requestSession } from "@/lib/api/sessions";
import { createUser } from "@/lib/api/users";
import { UserRegisterData } from "@/lib/types";
import { useRouter } from "next/router";
import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import styles from './LoginForm.module.css'

export default function LoginForm() {

	const [username, setUsername] = useState('');
	const [roomcode, setRoomcode] = useState('');
	const router = useRouter();

	function verify() {
	}

	function submitHandler(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		const userdata: UserRegisterData = {
			name: username,
			roomcode: roomcode,
			profilePicture: ''
		}
		
		createUser(userdata).then(({data})=>{
			console.log('id:', data.id);
			router.push(`r/${roomcode}`);
		});
	}

	return (
		<div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
			<form className={styles.container} onSubmit={submitHandler}>
				<div><h1>🐈‍⬛ChatCat</h1></div>
				<div className={styles.fieldBox}>
					<input type='text' name='name'
						placeholder="Username"
						onChange={e => setUsername(e.target.value)}
					/>
				</div>
				<div className={styles.fieldBox}>
					<input type='text' name='roomcode'
						placeholder="Room code"
						onChange={e => setRoomcode(e.target.value)}
					/>
				</div>
				<div className={styles.buttons}>
					<button className={styles.createBtn}>Create Room</button>
					<button className={styles.joinBtn}>Join</button>
				</div>
			</form>
		</div>
	)
}
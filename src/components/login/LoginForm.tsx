import { endSession, getSession, requestSession } from "@/lib/api/sessions";
import { createUser } from "@/lib/api/users";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react"
import { ProfilePictureNames } from "../register/RegisterForm";
import styles from './LoginForm.module.css'

export default function LoginForm() {

	const [username, setUsername] = useState('');
	const [roomcode, setRoomcode] = useState('');
	const [success, setSuccess] = useState(false);

	const myref = useRef<HTMLDivElement | null>(null);
	const router = useRouter();

	useEffect(() => {
		if (success) {
			router.replace(`/r/${roomcode}`)
		}
	}, [success, router, roomcode])

	function verify() {
		if (username.length <= 0 || roomcode.length <= 0) return false;
		return true;
	}

	async function submitHandler() {
		if (!verify()) return;

		try {
			const { data: session } = await getSession();
		} catch (err) {
			const { data: session } = await requestSession();
			console.log(session);
		}

		try {
			const profPic = ProfilePictureNames[Math.floor(Math.random()*ProfilePictureNames.length)]
			const { data: userdata } = await createUser({ name: username, profilePicture: profPic, roomcode })
			console.log(userdata);

			setSuccess(true);
		} catch (err) {
			console.error(err);

			const { status } = await endSession();
			console.log(status);
		}
	}

	return (
		<div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }} ref={myref}>
			<form className={styles.container} onSubmit={e => { e.preventDefault(); submitHandler() }}>
				<div style={{ marginBottom: '10px' }}><h1>🐈‍⬛ChatCat</h1></div>
				<div className={styles.fieldBox}>
					<input type='text' name='name'
						placeholder="Username"
						required
						onChange={e => setUsername(e.target.value)}
					/>
				</div>
				<div className={styles.fieldBox}>
					<input type='text' name='roomcode'
						placeholder="Room code"
						required
						onChange={e => setRoomcode(e.target.value)}
					/>
				</div>
				<div className={styles.buttons}>
					<Link href='/new' className='btn'>Create room</Link>
					<button type='submit' className={styles.joinBtn} onClick={e => submitHandler()}>Join</button>
				</div>
			</form>
		</div>
	)
}
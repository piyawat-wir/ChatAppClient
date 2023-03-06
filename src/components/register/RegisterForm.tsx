import { requestSession } from "@/lib/api/sessions";
import { createUser } from "@/lib/api/users";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react"
import styles from './RegisterForm.module.css'

export default function RegisterForm() {

	const [username, setUsername] = useState('');
	const router = useRouter();

	function verify() {
		if (username.length <= 0) return false;
		return true;
	}

	async function submitHandler() {
		if (!verify()) return;

		const { data: session } = await requestSession();
		console.log(session);

		const { data: userdata } = await createUser({ name: username, profilePicture: '' })
		console.log(userdata);

		router.push('/')
	}

	return (
		<div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
			<form className={styles.container} onSubmit={e => { e.preventDefault(); submitHandler() }}>
				<div style={{ marginBottom: '10px' }}><h1>🐈‍⬛ChatCat</h1></div>
				<div className={styles.fieldBox}>
					<input type='text' name='name'
						placeholder="Username"
						required
						onChange={e => setUsername(e.target.value)}
					/>
				</div>
				<div className={styles.buttons}>
					<Link href='/' className='btn'>Back</Link>
					<button type='submit' className={styles.joinBtn} onClick={e => submitHandler()}>Create new room</button>
				</div>
			</form>
		</div>
	)
}
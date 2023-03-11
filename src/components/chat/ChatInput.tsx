import Image from 'next/image'
import { useRef, useState } from 'react'
import { Socket } from 'socket.io-client'
import styles from './chat.module.css'

interface Props {
	socket: Socket
}

export default function ChatInput({ socket }: Props) {

	const [message, setMessage] = useState('');
	const inputBoxRef = useRef<HTMLInputElement | null>(null);

	function sendMessage() {
		if (!message) return;

		socket.emit('send_message', message);
		setMessage('');
		const input = inputBoxRef.current;
		if (input) input.value = '';
	}

	return <>
		<form onSubmit={e => { e.preventDefault(); sendMessage() }}>
			<div className={styles.input}>
				<input type='text'
					className={styles.inputfield}
					placeholder='Enter message here...'
					onChange={e => setMessage(e.currentTarget.value)}
					ref={inputBoxRef}
				/>
				<button type='submit' onClick={e => sendMessage()}>Send
					<Image
						src={'/img/icon_send.svg'} alt={'send'}
						width={24} height={24}
						style={{ filter: 'invert(100%)', marginLeft: '5px' }}
					/>
				</button>
			</div>
		</form>
	</>
}
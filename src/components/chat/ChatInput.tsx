import Image from 'next/image'
import styles from './chat.module.css'

export default function ChatInput() {
	return <>
		<div className={styles.input}>
			<textarea placeholder='Enter message here...' />
			<button>
				Send <Image src={'/img/icon_send.svg'} alt={'send'}
					width={24} height={24} style={{ filter: 'invert(100%)', marginLeft: '5px' }}
				/>
			</button>
		</div>
	</>
}
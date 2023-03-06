import { endSession } from '@/lib/api/sessions'
import Image from 'next/image'
import { useRouter } from 'next/router'
import styles from './room.module.css'

type Props = {
	roomcode: string
}

export default function RoomDetail({ roomcode }: Props) {

	const router = useRouter();

	async function leaveRoom() {
		const { status } = await endSession();
		console.log(status);

		router.push('/');
	}

	return <div className={styles.container}>
		<div className={styles.detail}>
			<h1>🧋A room name</h1>
			<div className="spacer"></div>
			<p>Description of this room will be shown here. blablabla Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non condimentum nibh. Mauris aliquet gravida ipsum in pharetra. Ut viverra tempor diam id suscipit. Cras nisl dui, aliquam at porttitor et, molestie ac sapien. Proin eu auctor nulla, a varius nunc. Suspendisse sit amet diam dapibus purus ullamcorper congue sit amet vel justo. Quisque ultricies est quis egestas maximus. Cras sit amet velit maximus, aliquet eros in, sodales ipsum. Nulla semper sit amet erat nec tincidunt.</p>
		</div>
		<div className={styles.control}>
			<button style={{ verticalAlign: 'middle' }} onClick={e => leaveRoom()}>
				<Image src={'/img/icon_logout.svg'} alt={'logout'}
					width={24} height={24} style={{ filter: 'invert(100%)' }}
				/> <span>Leave Room</span>
			</button>
		</div>
	</div>
}
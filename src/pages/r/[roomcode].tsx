import ChatInput from "@/components/chat/ChatInput";
import ChatLog from "@/components/chat/ChatLog";
import DefaultHead from "@/components/DefaultHead";
import RoomDetail from "@/components/room/RoomDetail";
import { useRouter } from "next/router";
import { useEffect } from "react";
import styles from '@/styles/Home.module.css'

export default function ChatRoom() {
	const router = useRouter();
	const { roomcode } = router.query;

	useEffect(() => {
		if (roomcode) 1;
		// router.push('/')
	}, [router, roomcode])

	if (!roomcode) return;

	return <>
		<DefaultHead />
		<main className={styles.main}>
			<div className={styles.sidebar} style={{ height: '100vh' }}	>
				<RoomDetail roomcode={roomcode as string} />
			</div>
			<div className={styles.body} style={{ height: '100vh' }}>
				<ChatLog room={roomcode as string} username={'sampleUser'} />
				<ChatInput />
			</div>
		</main>
	</>;
}
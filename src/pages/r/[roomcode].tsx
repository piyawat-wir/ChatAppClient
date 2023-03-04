import ChatInput from "@/components/chat/ChatInput";
import ChatLog from "@/components/chat/ChatLog";
import DefaultHead from "@/components/DefaultHead";
import RoomDetail from "@/components/room/RoomDetail";
import { GetServerSideProps } from "next";
import { AppCookies, getSessionData, SessionData } from "@/web/sessions";
import { AppServerSidePropsContext } from "@/lib/types";
import useSocket from "@/hooks/useSocket";
import styles from '@/styles/Home.module.css'

interface Props {
	session: SessionData
	sessionToken: AppCookies['auth']
}

export default function ChatRoom({ session, sessionToken }: Props) {

	const { roomcode } = session;
	const socket = useSocket(sessionToken);

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

export const getServerSideProps: GetServerSideProps =
	async ({ req }: AppServerSidePropsContext) => {
		const session = await getSessionData(req);
		const sessionToken = req.cookies.auth;

		if (!session) return {
			redirect: {
				destination: '/',
				permanent: false
			}
		};

		return { props: { session, sessionToken } }
	}

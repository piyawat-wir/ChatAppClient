import ChatInput from "@/components/chat/ChatInput";
import ChatLog from "@/components/chat/ChatLog";
import DefaultHead from "@/components/DefaultHead";
import RoomDetail from "@/components/room/RoomDetail";
import { GetServerSideProps } from "next";
import { AppCookies, getSessionData, SessionData } from "@/web/sessions";
import { AppServerSidePropsContext } from "@/lib/types";
import useSocket from "@/hooks/useSocket";
import MainLayout from "@/components/layout/Main";
import { useEffect } from "react";
import { getSession } from "@/lib/api/sessions";
import { NextRouter, useRouter } from "next/router";

interface Props {
	session: SessionData
	sessionToken: AppCookies['auth']
}

export default function ChatRoom({ session, sessionToken }: Props) {

	const { roomcode } = session;
	const socket = useSocket(sessionToken);
	const router = useRouter();

	useEffect(() => { createSessionRefresher(router) }, [router]);

	return <>
		<DefaultHead />
		<MainLayout
			sidebar={<RoomDetail roomcode={roomcode as string} />}
			body={<>
				<ChatLog socket={socket} userid={session.id} />
				<ChatInput socket={socket} />
			</>}
		/>
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

function createSessionRefresher(router: NextRouter) {
	const sessionRefresher = async () => {
		const sessionRefreshRate = 1000 * 60 * 10; // 10 min
		while (true) {
			try {
				await new Promise(resolve => setTimeout(resolve, sessionRefreshRate))
				const { status } = await getSession();
				if (status == 200) console.log('session refreshed!');
				else throw new Error('session no refresh!');
			}
			catch (err) {
				console.error('session not refresh!');
				router.push(router.asPath);
			}
		}
	};
	new Promise(sessionRefresher);
}

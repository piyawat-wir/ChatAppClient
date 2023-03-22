import { getExecEnv, isClient } from "@/lib";
import { endSession } from "@/lib/api/sessions";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { Socket, io } from "socket.io-client";

export default function useSocket(sessionToken?: string) {

	const [socket, setSocket] = useState<Socket>(io('', { autoConnect: false }));
	const router = useRouter()

	useEffect(() => {
		if (!isClient()) return;

		const token = (socket?.auth as { token?: string })?.token;
		if (token) return;

		socket.close();
		const socketOptions = { auth: { token: sessionToken } };
		const newSocket = io(process.env.NEXT_PUBLIC_BACKEND_URI, socketOptions)
		setSocket(newSocket);

	}, [sessionToken, socket])

	socket.on('error', (err: Error) => {
		console.error(err);
		if (err.message == 'InvalidCredential')
			endSession().then(() => router.push('/'))
	})
	socket.on('connect_error', err => {
		console.error(err);
		if (err.message == 'InvalidCredential')
			endSession().then(() => router.push('/'))
	})

	return socket;
}
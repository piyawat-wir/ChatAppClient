import { getExecEnv, isClient } from "@/lib";
import { useState, useEffect } from "react";
import { Socket, io } from "socket.io-client";

export default function useSocket(sessionToken?: string) {

	const [socket, setSocket] = useState<Socket>(io('', {autoConnect: false}));

	useEffect(() => {
		if (!isClient()) return;
		
		const token = (socket?.auth as { token?: string })?.token;
		if (token) return;
		
		socket.close();
		const socketOptions = { auth: { token: sessionToken } };
		const newSocket = io(process.env.BACKEND_URI, socketOptions)
		setSocket(newSocket);

	}, [sessionToken, socket])

	return socket;
}
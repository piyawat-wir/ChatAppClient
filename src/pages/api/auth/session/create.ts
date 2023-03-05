import { requestBackend } from "@/lib/auth";
import defaultHandler from "@/pages/_defaultHandler";
import { authenticateUserSession, SessionCookieData, SessionData } from "@/web/sessions";
import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

const handler = defaultHandler<NextApiRequest, NextApiResponse>()
	.post(async (req, res) => {
		const { data } = await requestBackend<SessionData>({
			axiosMethod: axios.post,
			path: '/session/create',
			auth: '',
		})
		authenticateUserSession(res, data as SessionCookieData);
		res.json(data);
	})

export default handler;
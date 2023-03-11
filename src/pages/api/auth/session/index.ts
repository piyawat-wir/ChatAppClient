import { NextApiRequest, NextApiResponse } from "next";
import defaultHandler from "@/pages/_defaultHandler";
import { authenticateUserSession, clearUserSession, getSessionData, getSessionToken, SessionCookieData } from "@/web/sessions";
import axios from "axios";
import { noAuth, ok } from "@/lib/api/handler";
import { requestBackend } from "@/lib/auth";

const handler = defaultHandler<NextApiRequest, NextApiResponse>()
	.post(async (req, res) => {
		const data = await getSessionData(req);
		if (!data) return noAuth(res);
		
		authenticateUserSession(res, data as SessionCookieData);
		res.json(data);
	})
	.delete(async (req, res) => {
		const token = getSessionToken(req);
		if (!token) return noAuth(res);

		await requestBackend({
			axiosMethod: axios.post,
			path: '/session/delete',
			auth: token
		})
		clearUserSession(res);
		ok(res);
	})

export default handler;
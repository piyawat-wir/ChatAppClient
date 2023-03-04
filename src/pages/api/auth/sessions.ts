import { authenticateUserSession, SessionData, clearUserSession } from "@/web/sessions";
import { NextApiRequest, NextApiResponse } from "next";
import defaultHandler from "@/pages/_defaultHandler";
import { login } from "@/lib/auth";

const handler = defaultHandler<NextApiRequest, NextApiResponse>()
	.post((req, res) => {
		const session = req.body as SessionData;
		const user = login(session);

		if (user) {
			authenticateUserSession(res, session);
			res.json(user);
		} else {
			res.status(400).send('');
		}
	})
	.delete((req, res) => {
		clearUserSession(res);
		res.send('');
	})

export default handler;
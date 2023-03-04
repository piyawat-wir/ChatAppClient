import { UserRegisterData } from "@/lib/types";
import { createUserInDatabase } from "@/lib/users";
import defaultHandler from "@/pages/_defaultHandler";
import { authenticateUserSession, SessionData } from "@/web/sessions";
import { NextApiRequest, NextApiResponse } from "next";

const handler = defaultHandler<NextApiRequest, NextApiResponse>()
	.post((req, res) => {
		const data = req.body as UserRegisterData;
		const user = createUserInDatabase(data);
		const authParams: SessionData = {
			id: user.id,
			roomcode: data.roomcode
		};
		authenticateUserSession(res, authParams);
		res.json(user);
	})

export default handler;
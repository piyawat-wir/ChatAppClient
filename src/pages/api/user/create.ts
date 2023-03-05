import { UserData, UserRegisterData } from "@/lib/types";
import defaultHandler from "@/pages/_defaultHandler";
import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { getSessionToken } from "@/web/sessions";
import { requestBackend } from "@/lib/auth";
import { handleErrorStatus, noAuth } from "@/lib/api/handler";

const handler = defaultHandler<NextApiRequest, NextApiResponse>()
	.post(async (req, res) => {
		const token = getSessionToken(req);
		if (!token) return noAuth(res);

		const userdata = req.body as UserRegisterData
		const { data, status } = await requestBackend<UserData>({
			axiosMethod: axios.post,
			path: '/user/create',
			auth: token,
			data: userdata
		})
		handleErrorStatus(status, res);
		
		res.json(data);
	})

export default handler;
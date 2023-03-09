import defaultHandler from "@/pages/_defaultHandler";
import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { getSessionToken } from "@/web/sessions";
import { requestBackend } from "@/lib/auth";
import { handleErrorStatus, noAuth, ok } from "@/lib/api/handler";
import { UserData } from "@/lib/types";

const handler = defaultHandler<NextApiRequest, NextApiResponse>()
	.post(async (req, res) => {
		const token = getSessionToken(req);
		if (!token) return noAuth(res);

		const { data, status } = await requestBackend<UserData>({
			axiosMethod: axios.post,
			path: '/user',
			auth: token
		})
		if (handleErrorStatus(status, res)) return;

		res.json(data);
	})
	.delete(async (req, res) => {
		const token = getSessionToken(req);
		if (!token) return noAuth(res);

		const { status } = await requestBackend({
			axiosMethod: axios.post,
			path: '/user/delete',
			auth: token
		})
		if (handleErrorStatus(status, res)) return;

		ok(res);
	})

export default handler;
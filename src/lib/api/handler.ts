import { NextApiResponse } from "next";

export const badRequest = (res: NextApiResponse) => res.status(400).send('bad request')
export const noAuth = (res: NextApiResponse) => res.status(401).send('no auth')
export const notFound = (res: NextApiResponse) => res.status(404).send('not found')

export const ok = (res: NextApiResponse) => res.status(200).send('ok')

const errhandler: Record<number, typeof noAuth> = {
	400: badRequest,
	401: noAuth,
	404: notFound,
}

export function handleErrorStatus(status: number, res: NextApiResponse) {
	if (!errhandler[status]) return false;
	errhandler[status](res);
	return true;
}

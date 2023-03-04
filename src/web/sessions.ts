import { IncomingMessage, ServerResponse } from "http";
import { NextApiRequestCookies } from "next/dist/server/api-utils";
import { NextApiResponse } from "next";
import { serialize } from "cookie";
import jwt from 'jsonwebtoken'

const JWT_TOKEN_KEY = process.env.JWT_TOKEN_KEY || 'defaultsecretkey';
const cookieOptions = {
	httpOnly: true,
	maxAge: 60 * 60, //1 hr
	path: '/',
	sameSite: 'Strict',
	secure: process.env.NODE_ENV === 'production'
}

export interface AppCookies { auth?: string }
export type AppCookieName = keyof AppCookies

export type CustomIncomingMessage = IncomingMessage & {
	cookies: NextApiRequestCookies & AppCookies
}

export interface SessionData {
	id: string,
	roomcode: string,
}

export function setCookie(
	res: ServerResponse,
	name: AppCookieName,
	value: string,
	options?: Record<string, unknown>
) {
	const valueAsString = (typeof value === 'object') ?
		`j:${JSON.stringify(value)}` :
		value.toString();
	res.setHeader('Set-Cookie', serialize(name, valueAsString, options));
}

export function authenticateUserSession(res: NextApiResponse, session: SessionData) {
	if (!session) return;

	const payload = { id: session.id, roomcode: session.roomcode };
	const options = { expiresIn: '1h' };
	const token = jwt.sign(payload, JWT_TOKEN_KEY, options);
	setCookie(res, "auth", token, cookieOptions);
}

export function clearUserSession(res: NextApiResponse) {
	setCookie(res, 'auth', '0', {
		...cookieOptions,
		path: '/',
		maxAge: 1
	});
}

export async function getSessionData(req: CustomIncomingMessage) {
	const { auth: token } = req.cookies;

	if (!token) return;

	try {
		const sessionData = jwt.verify(token, JWT_TOKEN_KEY) as SessionData;

		// TODO: check user session
		// TODO: if inactive session exists, return data
		// TODO: if active sessions exists, return none

		return sessionData;
	} catch (err) { return }
}
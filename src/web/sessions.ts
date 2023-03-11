import { IncomingMessage, ServerResponse } from "http";
import { NextApiRequestCookies } from "next/dist/server/api-utils";
import { NextApiResponse } from "next";
import { serialize } from "cookie";
import jwt from 'jsonwebtoken'
import axios from "axios";
import { requestBackend } from "@/lib/auth";

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

export interface SessionCookieData {
	id: string
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

	const rawCookieHeader = (res.getHeader('Set-Cookie') || []) as string | string[];
	const cookieHeader = (typeof rawCookieHeader !== 'object') ? [rawCookieHeader] : rawCookieHeader

	res.setHeader('Set-Cookie', [...cookieHeader, serialize(name, valueAsString, options)]);
}

export function authenticateUserSession(res: NextApiResponse, session: SessionCookieData) {
	if (!session) return;

	const payload = { id: session.id };
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

export interface SessionData extends SessionCookieData {
	createTime: number
	id: string
	roomcode: string
}
export interface BackendRequestBody {
	auth: string
	data?: Record<string, any>
}

export const getSessionToken = (req: CustomIncomingMessage) => req.cookies.auth;

export function getSessionCookie(req: CustomIncomingMessage) {
	const token = getSessionToken(req);
	if (!token) return;

	try {
		const session = jwt.verify(token, JWT_TOKEN_KEY) as SessionCookieData;
		if (!session) return;
		return session;
	} catch (err) { return }
}

export async function getSessionData(req: CustomIncomingMessage) {
	const token = getSessionToken(req);
	if (!token) return;

	const session = getSessionCookie(req);
	if (!session) return;

	const res = await requestBackend<SessionData>({
		axiosMethod: axios.post,
		path: '/session',
		auth: token
	})
	return res.data;
}
import { BackendRequestBody, SessionCookieData, SessionData } from '@/web/sessions'
import axios, { Axios, AxiosError, AxiosResponse } from 'axios';
import { UserData } from '../types'


export function login(params: SessionCookieData) {
	// TODO: return user data if user exist in chatroom

	const user: UserData = {
		id: params.id,
		name: `[--${params.id.toUpperCase()}--]`,
		profilePicture: ''
	}

	return user;
}
const acceptStatus = [200]
type axiosMethod = Axios['delete'] | Axios['get'] | Axios['post'] |
	Axios['put'] | Axios['head']
export interface BackendRequest {
	path: string
	axiosMethod: axiosMethod
	auth: string
	data?: any
}
export async function requestBackend<T>({ path, axiosMethod, auth, data }: BackendRequest) {
	try {
		const uri = new URL(path, process.env.NEXT_PUBLIC_BACKEND_URI).href;
		const body: BackendRequestBody = { auth, data };
		const res = await axiosMethod<T>(uri, body);
		if (!acceptStatus.includes(res.status))
			throw new AxiosError(undefined, String(res.status), res.config, res.request, res);
		return res;
	} catch (err) {
		const res = (err as AxiosError<T>).response || {} as AxiosResponse<T>;
		// console.error(res)
		return res;
	}
}
import { SessionData } from '@/web/sessions'
import { UserData } from '../types'


export function login(params: SessionData) {
	// TODO: return user data if user exist in chatroom

	const user: UserData = {
		id: params.id,
		name: `[--${params.id.toUpperCase()}--]`,
		profilePicture: ''
	}

	return user;
}
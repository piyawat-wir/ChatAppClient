import { SessionData } from "@/web/sessions";
import { UserData } from "@/lib/types";
import axios from "axios";

const API_URI = 'api/auth/sessions';

export function requestSession(authData: SessionData) {
	return axios.post<UserData>(API_URI, authData)
}

export function endSession() {
	return axios.delete(API_URI);
}
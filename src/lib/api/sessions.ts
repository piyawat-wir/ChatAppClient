import { SessionData } from "@/web/sessions";
import axios from "axios";
import path from "path";

const API_URI = '/api/auth/session';

export function requestSession() {
	const uri = path.join(API_URI, 'create');
	return axios.post<SessionData>(uri);
}

export function getSession() {
	return axios.post<SessionData>(API_URI);
}

export function endSession() {
	return axios.delete(API_URI);
}
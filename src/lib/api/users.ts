import { UserData, UserRegisterData } from "@/lib/types";
import axios from "axios";
import path from "path";

const API_URI = 'api/users';

export function createUser(userdata: UserRegisterData) {
	const uri = path.join(API_URI, 'create');
	return axios.post<UserData>(uri, userdata);
}

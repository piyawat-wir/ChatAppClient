import { UserData, UserRegisterData } from "./types";

export function generateID(length: number) {
	const numeral = "0123456789";
	const alphabetL = "abcdefghijklmnopqrstuvwxyz";
	const alphabetH = alphabetL.toUpperCase();
	const charSet = numeral + alphabetH + alphabetL;
	let id = '';

	for (let i = 0; i < length; i++) {
		let ci = Math.floor(Math.random()*charSet.length);
		id += charSet[ci]
	}
	return id;
}

export function createUserInDatabase(data: UserRegisterData) {
	const user: UserData = {
		id: generateID(10),
		name: data.name,
		profilePicture: data.profilePicture
	};

	// TODO: create user in database

	return user;
}
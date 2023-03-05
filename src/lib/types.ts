import { AppCookies, CustomIncomingMessage } from "@/web/sessions"
import { IncomingMessage } from "http"
import { GetServerSidePropsContext } from "next"
import { NextApiRequestCookies } from "next/dist/server/api-utils"

export type UserData = {
	id: string,
	name: string,
	profilePicture: string
}

export type UserRegisterData = {
	name: string,
	profilePicture: string
}

export interface AppServerSidePropsContext extends GetServerSidePropsContext {
	req: CustomIncomingMessage
}
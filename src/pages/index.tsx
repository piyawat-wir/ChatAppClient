import LoginForm from '@/components/login/LoginForm'
import DefaultHead from '@/components/DefaultHead'
import { AppServerSidePropsContext } from '@/lib/types'
import { getSessionData } from '@/web/sessions'
import { GetServerSideProps } from 'next'
import MainLayout from '@/components/layout/Main'

export default function Home() {
	return <>
		<DefaultHead />
		<MainLayout
			sidebar={<LoginForm />}
		/>
	</>
}

export const getServerSideProps: GetServerSideProps =
	async ({ req }: AppServerSidePropsContext) => {
		const session = await getSessionData(req) || null;
		if (session?.roomcode) {
			return {
				redirect: {
					destination: `r/${session.roomcode}`,
					permanent: false
				}
			}
		}

		return { props: {} }
	}

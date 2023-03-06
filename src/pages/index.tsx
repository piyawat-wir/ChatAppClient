import LoginForm from '@/components/login/LoginForm'
import styles from '@/styles/Home.module.css'
import DefaultHead from '@/components/DefaultHead'
import { AppServerSidePropsContext } from '@/lib/types'
import { getSessionData } from '@/web/sessions'
import { GetServerSideProps } from 'next'

export default function Home() {
	return (
		<>
			<DefaultHead />
			<main className={styles.main}>
				<div className={styles.sidebar}>
					<LoginForm />
				</div>
				<div className={styles.body}>
				</div>
			</main>
		</>
	)
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

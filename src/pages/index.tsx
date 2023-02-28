import LoginForm from '@/components/login/LoginForm'
import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import DefaultHead from '@/components/DefaultHead'

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

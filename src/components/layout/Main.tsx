import styles from '@/styles/Home.module.css'

interface Props {
	sidebar?: JSX.Element
	body?: JSX.Element
}

export default function MainLayout({ sidebar, body }: Props) {
	return <main className={styles.main}>
		<div className={styles.sidebar} style={{ height: '100vh' }}	>
			{sidebar}
		</div>
		<div className={styles.body} style={{ height: '100vh' }}>
			{body}
		</div>
	</main>
}
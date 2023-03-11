import DefaultHead from '@/components/DefaultHead'
import { getServerSideProps as getServerSidePropsHandler } from '@/pages'
import RegisterForm from '@/components/register/RegisterForm'
import MainLayout from '@/components/layout/Main'

export default function Home() {
	return <>
		<DefaultHead />
		<MainLayout
			sidebar={<RegisterForm />}
		/>
	</>
}

export const getServerSideProps = getServerSidePropsHandler

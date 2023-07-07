import { useEffect } from 'preact/hooks'
import { useNavigate } from 'react-router-dom'


export function useRedirectGuard(data: any, where: string) {
	const navigate = useNavigate()
	useEffect(() => {
		if (!data) navigate(where)
	}, [ data ])
}

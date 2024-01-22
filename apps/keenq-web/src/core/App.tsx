import CombinedContext from '@/context/CombinedContext'
import Router from '@/pages/Routes'


function App() {
	return (
		<CombinedContext>
			<Router />
		</CombinedContext>
	)
}

export default App

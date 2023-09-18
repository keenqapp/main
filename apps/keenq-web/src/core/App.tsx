import 'normalize.css'
import 'system-font-css'
import CombinedContext from '@/context/CombinedContext'
// import Partytown from '@/core/Partytown'
import Router from '@/pages/Routes'


function App() {
	return (
		<CombinedContext>
			{/*<Partytown />*/}
			<Router />
		</CombinedContext>
	)
}

export default App

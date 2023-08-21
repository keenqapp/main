import { Partytown as RPartytown } from '@builder.io/partytown/react'


function Partytown() {
	return <RPartytown debug={import.meta.env.DEV} forward={['dataLayer.push']} />
}

export default Partytown

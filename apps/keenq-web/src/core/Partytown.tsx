import { Partytown as RPartytown } from '@builder.io/partytown/react'


function Partytown() {
	return <RPartytown forward={['dataLayer.push']} />
}

export default Partytown

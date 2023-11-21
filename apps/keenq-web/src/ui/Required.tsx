import styled from '@emotion/styled'


const StyledRequired = styled.span`
	color: ${p => p.theme.palette.error.main};
`

function Required() {
	return (
		<StyledRequired data-testid='Required'>{'*'}</StyledRequired>
	)
}

export default Required

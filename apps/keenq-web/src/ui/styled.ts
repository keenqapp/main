// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import _styled, { CreateStyled } from '@emotion/styled'


function create(component) {
	return function(template: TemplateStringsArray) {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		return _styled(component, {
			shouldForwardProp: (prop: string) => !prop.startsWith('$')
		})(template)
	}
}

export default function styled(component): CreateStyled {
	return create(component)
}

styled.div = create<HTMLDivElement>('div')
styled.img = create('img')

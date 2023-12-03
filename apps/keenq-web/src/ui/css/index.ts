import { css, keyframes } from '@emotion/react'


export const column = css`
	display: flex;
	flex-direction: column;
	flex: 1;
`

const appears = keyframes`
    0% {
        opacity: 0.01;
        transform: translateY(25px);
    }
    100% {
        opacity: 1;
        transform: translateY(0);
    }
`
export const appear = css`
  animation: ${appears} 0.3s ease-in-out;
`

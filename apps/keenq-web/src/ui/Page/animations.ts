import { keyframes } from '@emotion/react'


export const fadeInLeft = keyframes`
  0% {
    opacity: 0.01;
    transform: translateX(50px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
`

export const fadeIn = keyframes`
  0% {
    opacity: 0.01;
		transform: scale(0.8);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
`

export const fadeInTop = keyframes`
  0% {
    opacity: 0.01;
    transform: translateY(-25px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`

export function getKeyframes(name?: string) {
	switch (name) {
		case 'fadeInLeft': return fadeInLeft
		case 'fadeIn': return fadeIn
		case 'fadeInTop': return fadeInTop
		default: return fadeInLeft
	}
}

import { useEffect, useRef } from 'preact/hooks'
import styled from '@emotion/styled'

import { checkSnap } from '@/components/Swiper/utils'


const SwiperContainer = styled.div`
  width: calc(100vw - 2rem);
  height: calc(100vw - 2rem);
	display: flex;
	flex-direction: column;
	flex-wrap: nowrap;
	overflow: scroll;
	scroll-snap-type: y mandatory;
  scroll-snap-stop: always;
`

const Image = styled.img`
  width: 100%;
  aspect-ratio: 1;
  border-radius: 16px;
  background-image: linear-gradient(45deg, rgba(127, 20, 193, 0.06), rgba(128, 251, 251, 0.1));
  scroll-snap-align: start;
`

function Swiper({ images }: { images: string[] }) {
	const ref = useRef<HTMLDivElement>(null)
	useEffect(() => {
		checkSnap(ref.current)
	}, [])
	const handleScroll = (e: any) => {
		if (ref.current) {
			requestAnimationFrame(() => {
				const dot = e.target.scrollTop / ref.current.scrollHeight * images.length
				console.log('--- Swiper.tsx:32 -> handleScroll ->', e.target.scrollTop, dot)
			})
		}
	}

	return (
		<SwiperContainer data-testid='Swiper' ref={ref} onScroll={handleScroll}>
			{images.map((image) => <Image key={image} src={image} />)}
		</SwiperContainer>
	)
}

export default Swiper

import { cloneElement, VNode } from 'preact'
import { useEffect, useRef, useState } from 'preact/hooks'
import styled from '@emotion/styled'

import SwiperDots from '@/components/Swiper/SwiperDots'
import { checkSnap } from '@/components/Swiper/utils'

import { IImage } from '@/model/other'


const SwiperContainer = styled.div`
  position: relative;
`

const SwiperScroll = styled.div`
  width: calc(100vw - 2rem);
  height: calc(100vw - 2rem);
	display: flex;
	flex-direction: column;
	flex-wrap: nowrap;
	overflow: scroll;
	scroll-snap-type: y mandatory;
  scroll-snap-stop: always;
`

const ImageContainer = styled.div`
	position: relative;
`

const Image = styled.img`
  width: 100%;
  aspect-ratio: 1;
  border-radius: 16px;
  background-image: linear-gradient(45deg, rgba(127, 20, 193, 0.06), rgba(128, 251, 251, 0.1));
  scroll-snap-align: start;
  display: block;
	object-fit: cover;
`

interface SwiperProps {
	images: IImage[]
	buttons?: VNode
	onScroll?: any
}

function Swiper({ images, buttons, onScroll }: SwiperProps) {
	const [ dot, setDot ] = useState(0)
	const ref = useRef<HTMLDivElement>(null)
	useEffect(() => {
		checkSnap(ref.current)
	}, [])

	const count = useRef(images.length)
	const scrollTo = (where: 'top' | 'bottom' | 'next' | 'prev') => {
		if (ref.current) {
			const { scrollHeight, clientHeight } = ref.current
			switch (where) {
				case 'top': return ref.current.scrollTo({ top: 0, behavior: 'smooth' })
				case 'bottom': return ref.current.scrollTo({ top: scrollHeight - clientHeight, behavior: 'smooth' })
				// case 'next': return ref.current.scrollTo({ top: scrollTop + clientHeight, behavior: 'smooth' })
				// case 'prev': return ref.current.scrollTo({ top: scrollTop - clientHeight, behavior: 'smooth' })
			}
		}
	}
	useEffect(() => {
		if (onScroll) onScroll.current = scrollTo
	}, [ onScroll ])
	useEffect(() => {
		if (count.current < images.length) scrollTo('bottom')
		count.current = images.length
	}, [ images.length ])

	const handleScroll = (e: any) => {
		if (ref.current) {
			requestAnimationFrame(() => {
				const newDot = Math.round(e.target!.scrollTop / ref.current!.scrollHeight * images.length)
				if (newDot !== dot) setDot(newDot)
			})
		}
	}

	return (
		<SwiperContainer>
			<SwiperScroll data-testid='Swiper' ref={ref} onScroll={handleScroll}>
				{images.map(({ uid, url }) => (
					<ImageContainer key={uid}>
						<Image src={url} />
						{buttons && cloneElement(buttons, { uid })}
					</ImageContainer>
				))}
			</SwiperScroll>
			{images.length > 1 && <SwiperDots length={images.length} current={dot} />}
		</SwiperContainer>
	)
}

export default Swiper

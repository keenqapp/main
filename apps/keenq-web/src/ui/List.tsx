import { cloneElement, VNode } from 'preact'
import { useEffect, useRef, useState } from 'preact/hooks'
import styled from '@emotion/styled'

import { column } from '@/ui/css'

import { Entity } from '@/types/utility'


const ListContainer = styled.div<{ height: number }>`
	position: relative;
	${column}
`

const ScrollContainer = styled.div`
	position: absolute;
	left: 0;
	right: 0;
	top: 0;
  z-index: 1;
`

const Scroll = styled.div`
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  padding-top: 1rem;
  padding-bottom: 1rem;
  height: ${p => p.height}px;
`

const Fade = styled.div<{ position: 'start' | 'end' }>`
	position: absolute;
	left: 0;
	right: 0;
	height: 1rem;
	z-index: 2;
  background: linear-gradient(${p => p.position === 'start' ? 0 : 180}deg, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 75%);
	${p => p.position === 'start' ? 'top: 0;' : 'bottom: 0;'}
`

const StyledAutosizer = styled.div`
	flex: 1;
`

function Autosizer({ setHeight }: { setHeight: (height: number) => void }) {
	const ref = useRef<HTMLDivElement>(null)
	useEffect(() => {
		setHeight(ref.current?.clientHeight || 0)
		if (!ref.current) return
		const resizeObserver = new ResizeObserver(() => {
			setHeight(ref.current?.clientHeight || 0)
		})
		resizeObserver.observe(ref.current)
		return () => resizeObserver.disconnect()
	}, [setHeight])
	return <StyledAutosizer ref={ref} />
}

interface ListProps<P extends Entity, > {
	data?: P[]
	render: (item: P, index: number) => VNode<P> | VNode
	empty?: () => VNode
	scrollRef?: any
	className?: string
	loading?: () => VNode
	isLoading?: boolean
}

function List<T extends Entity>({ data, render, scrollRef, empty, className, ...rest }: ListProps<T>) {
	const [ height, setHeight ] = useState(0)
	if (data && data?.length < 1 && empty) return empty()
	return (
		<ListContainer data-testid='List'>
			<Autosizer setHeight={setHeight} />
			<ScrollContainer {...rest}>
				<Fade position='start' />
				<Scroll ref={scrollRef} height={height} className={className}>
					{(data || []).map((item, index) => {
						const component = render(item, index)
						if (!component) return null
						return cloneElement(component, { key: item.id })
					})}
				</Scroll>
				<Fade position='end' />
			</ScrollContainer>
		</ListContainer>
	)
}

export default List

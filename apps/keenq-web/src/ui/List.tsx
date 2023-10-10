import { VNode } from 'preact'
import { useEffect, useRef, useState } from 'preact/hooks'
import styled from '@emotion/styled'

import { column } from '@/ui/css'

import { Entity } from '@/types/utility'


const ListContainer = styled.div<{ height?: number }>`
	position: relative;
	width: 100%;
	${column};
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
  height: ${p => p.height}px;
	scroll-behavior: smooth;
`

const StyledAutosizer = styled.div`
	flex: 1;
`

function Autosizer({ setHeight, name, debug }: { setHeight: (height: number) => void, name?: string, debug?: boolean }) {
	const ref = useRef<HTMLDivElement>(null)
	useEffect(() => {
		setHeight(ref.current?.clientHeight || 0)
		if (!ref.current) return
		const resizeObserver = new ResizeObserver(() => {
			if (name && debug) console.log('--- List.tsx:52 ->', name, ref.current?.clientHeight)
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
	name?: string
}

function List<T extends Entity>({ data, render, scrollRef, empty, className, name, ...rest }: ListProps<T>) {
	const [ height, setHeight ] = useState(0)
	if (data && data?.length < 1 && empty) return empty()

	// useEffect(() => {
	// 	console.log('--- List.tsx:70 ->  ->', scrollRef.current)
	// }, [])

	return (
		<ListContainer data-testid='List'>
			<Autosizer setHeight={setHeight} name={name} />
			<ScrollContainer {...rest}>
				<Scroll ref={scrollRef} height={height} className={className}>
					{(data || []).map((item, index) => {
						const Component = render
						return <Component key={item.id} index={index} {...item} />
					})}
				</Scroll>
			</ScrollContainer>
		</ListContainer>
	)
}

export default List

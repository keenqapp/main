import { ReactNode } from 'react'
import { useEffect, useRef, useState } from 'react'
import styled from '@emotion/styled'
import { useVirtualizer, VirtualItem } from '@tanstack/react-virtual'
import { motion } from 'framer-motion'

import Fab from '@mui/material/Fab'

import ExpandLessTwoToneIcon from '@mui/icons-material/ExpandLessTwoTone'
import ExpandMoreTwoToneIcon from '@mui/icons-material/ExpandMoreTwoTone'

import { column } from '@/ui/css'
import IfElse from '@/ui/IfElse'
import theme from '@/ui/theme'

import { Entity } from '@/types/utility'


const ListContainer = styled.div<{ height?: number }>`
	position: relative;
	width: 100%;
	${column};
	.fabs {
		z-index: 2;
		position: absolute;
		right: 1rem;
		bottom: 1rem;
	}
`

const ScrollContainer = styled.div<{ $height?: number, $reversed?: boolean }>`
	position: absolute;
	left: 0;
	right: 0;
	top: 0;
  z-index: 1;
	height: ${p => p.$height}px;
	overflow-y: auto;
	${p => p.$reversed && 'transform: scaleY(-1)'};
	contain: strict;
`

const Scroll = styled.div<{ $height?: number, $reversed?: boolean }>`
	contain: strict;
  display: flex;
  flex-direction: column;
  height: ${p => p.$height}px;
	position: relative;
`

const ListItem = styled.div<{ $start: number, $reversed?: boolean }>`
	position: absolute;
	top: 0;
	left: 0;
	transform: translateY(${p => p.$start}px) ${p => p.$reversed && 'scaleY(-1)'};
	width: 100%;
	display: flex;
	flex-direction: column;
`

const StyledAutosizer = styled.div`
	flex: 1;
`

const SFab = styled(Fab)<{ show: boolean }>`
	background-color: ${theme.color.primaryLight};
	&:focus {
		background-color: ${theme.color.primaryLight};
	}
`

const variants = {
	visible: { opacity: 1, translateY: '0', transition: { duration: 0.2 } },
	hidden: { opacity: 0, translateY: '25px', transition: { duration: 0.2 } }
}

interface ListProps<P extends Entity, > {
	data: P[]
	render: (item: P, index: number) => ReactNode
	empty?: () => ReactNode
	scrollRef?: any
	className?: string
	loading?: () => ReactNode
	isLoading?: boolean
	name?: string
	reversed?: boolean
	virtual?: boolean
}

function List<T extends Entity>({ data = [], render, empty, className, name, reversed = false,  ...rest }: ListProps<T>) {
	const scroll = useRef<HTMLDivElement>(null)
	const [ height, setHeight ] = useState(0)
	const [ show, setShow ] = useState(false)

	const virtualizer = useVirtualizer({
		count: data.length,
		getScrollElement: () => scroll.current,
		estimateSize: () => 300,
		onChange: v => setShow(v.scrollOffset > 100),
		overscan: 5
	})
	
	const top = () => virtualizer.scrollToIndex(0)

	useEffect(() => {
		if (!reversed) return
		const handleScroll = (e: WheelEvent) => {
			e.preventDefault()
			const currentTarget = e.currentTarget as HTMLElement
			if (currentTarget) currentTarget.scrollTop -= e.deltaY
		}
		scroll.current?.addEventListener('wheel', handleScroll, { passive: false })
		return () => scroll.current?.removeEventListener('wheel', handleScroll)
	}, [])


	if (data && data?.length < 1 && empty) return empty()

	const items = virtualizer.getVirtualItems()

	return (
		<ListContainer data-testid="List">
			<motion.div animate={show ? 'visible' : 'hidden'} variants={variants} className='fabs'>
				<IfElse cond={reversed}>
					<SFab size="small" show={show} onClick={top}><ExpandMoreTwoToneIcon/></SFab>
					<SFab size="small" show={show} onClick={top}><ExpandLessTwoToneIcon/></SFab>
				</IfElse>
			</motion.div>
			<Autosizer setHeight={setHeight} name={name}/>
			<ScrollContainer
				$height={height}
				$reversed={reversed}
				ref={scroll}
				{...rest}
			>
				<Scroll
					className={className}
					$height={virtualizer.getTotalSize()}
					$reversed={reversed}
				>
					{items.map(({ key, index, start }: VirtualItem) => {
						const item = data[index]
						const Component = render
						return (
							<ListItem
								key={key}
								data-index={index}
								ref={virtualizer.measureElement}
								$reversed={reversed}
								$start={start}
							>
								<Component
									index={index}
									{...item}
								/>
							</ListItem>
						)
					})}
				</Scroll>
			</ScrollContainer>
		</ListContainer>
	)
}

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

export default List

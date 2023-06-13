import { cloneElement, Fragment } from 'preact'
import { useEffect, useRef } from 'preact/hooks'
import styled from '@emotion/styled'
import { ReactNode } from 'react'

import { Entity } from '@/types/types'


interface ListProps<T extends Entity> {
	data: T[]
	renderItem: (item: T, index: number) => ReactNode
}

const ListContainer = styled.div`
	box-sizing: border-box;
	overflow-y: auto;
	display: flex;
	flex-direction: column;
	gap: 1rem;
	padding-bottom: 1rem;
`

function List<T extends Entity>({ data, renderItem, ...rest }: ListProps<T>) {
	const ref = useRef<HTMLDivElement>(null)

	useEffect(() => {
		ref.current?.scrollTo(0, ref.current.scrollHeight)
	}, [])

	return (
		<ListContainer
			data-testid='List'
			ref={ref}
			gap={1}
			{...rest}
		>
			{data.map((item, index) => cloneElement(renderItem(item, index), { key: item.uid }))}
		</ListContainer>
	)
}

export default List

import { ComponentChildren } from 'preact'
import styled from '@emotion/styled'


const UploadContaniner = styled.div`
	position: relative;
	& input {
		visibility: hidden;
		position: absolute;
		top: 0;
		left: 0;
	}
`

interface UploadProps {
	children: ComponentChildren
	accept?: string
	onChange: (e: any) => void
	id?: string
}

function Upload({ children, accept, onChange, id = 'upload-button' }: UploadProps) {
	return (
		<UploadContaniner data-testid='UploadButton'>
			<label htmlFor={id}>
				{children}
			</label>
			<input
				accept={accept}
				id={id}
				type='file'
				onChange={onChange}
			/>
		</UploadContaniner>
	)
}

export default Upload

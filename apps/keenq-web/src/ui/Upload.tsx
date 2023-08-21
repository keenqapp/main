import { ComponentChildren } from 'preact'
import styled from '@emotion/styled'


const UploadContainer = styled.div`
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
	multiple?: boolean
}

function Upload({ children, accept, onChange, multiple = false, id = 'upload-button' }: UploadProps) {
	return (
		<UploadContainer data-testid='UploadButton'>
			<label htmlFor={id}>
				{children}
			</label>
			<input
				accept={accept}
				id={id}
				type='file'
				multiple={multiple}
				onChange={onChange}
			/>
		</UploadContainer>
	)
}

export default Upload

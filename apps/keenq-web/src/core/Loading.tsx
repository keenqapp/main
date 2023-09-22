import CircularProgress from '@mui/material/CircularProgress'


function Loading({ size }: { size?: number | string }) {
	return (
		<div data-testid='Loading'>
			<CircularProgress size={size} />
		</div>
	)
}

export default Loading

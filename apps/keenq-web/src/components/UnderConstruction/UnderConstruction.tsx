import Typography from '@mui/material/Typography'

import HandymanTwoToneIcon from '@mui/icons-material/HandymanTwoTone'

import Container from '@/ui/Container'
import Row from '@/ui/Row'


interface UnderConstructionProps {
	text: string
	subtext?: string
}

// function UnderConstruction({ text, subtext }: UnderConstructionProps) {
// 	return (
// 		<Container data-testid='UnderConstruction' flex={1} horizontal={4}>
// 			<Row
// 				justify='center'
// 				align='center'
// 				direction='column'
// 				flex={1}
// 				gap={1}
// 			>
// 				<HandymanTwoToneIcon color='secondary' />
// 				<Typography variant='h5' align='center'>{text}</Typography>
// 				<Typography align='center'>{subtext}</Typography>
// 			</Row>
// 		</Container>
// 	)
// }

function UnderConstruction({ text, subtext }: UnderConstructionProps) {
	return pug`
		Container(flex=1 horizontal=4)
			Row(
				justify='center'
				align='center'
				direction='column'
				flex=1
				gap=1
			)
				HandymanTwoToneIcon(color='secondary')
				Typography(variant='h5' align='center') #{text}
				Typography(align='center') #{subtext}
	`
}

export default UnderConstruction

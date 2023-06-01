import styled from '@emotion/styled'

import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import IconButton, { IconButtonProps } from '@mui/material/IconButton'

interface Props {}

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props
  return <IconButton {...other} />
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}))

interface Props {
  expanded: boolean;
  onClick?: () => void;
}

function Expand({ expanded, onClick }: Props) {
  const handleExpand = () => onClick?.()
  return (
    <ExpandMore expand={expanded} onClick={handleExpand}>
      <ExpandMoreIcon />
    </ExpandMore>
  )
}

export default Expand

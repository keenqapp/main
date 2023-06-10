import { useLocation, useNavigate } from 'react-router-dom'
import { keyframes } from '@emotion/react'
import styled from '@emotion/styled'

import ArrowBackIosNewTwoToneIcon from '@mui/icons-material/ArrowBackIosNewTwoTone'
import EmojiEmotionsTwoToneIcon from '@mui/icons-material/EmojiEmotionsTwoTone'
import MenuTwoToneIcon from '@mui/icons-material/MenuTwoTone'
import AppBar from '@mui/material/AppBar'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Toolbar from '@mui/material/Toolbar'

import Space from '@/ui/Space'

import AppbarMenu from '@/core/Appbar/AppbarMenu'
import { useMenuOpen } from '@/hooks/useMenuOpen'


const StyledAppBar = styled(AppBar)`
  height: var(--appbar-height);
  background-color: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(6px);
  color: ${({ theme }) => theme.palette.primary.contrastText};
  box-shadow: none;
`

const fadeInTop = keyframes`
  0% {
    opacity: 0.01;
    transform: translateY(-25px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`

const BackButton = styled(Button)`
  animation: ${fadeInTop} 300ms ease-in-out 1;
`

const HomeButton = styled(Button)`
  animation: ${fadeInTop} 300ms ease-in-out 1;
`

export default function Appbar() {

  const { open, setMenuOpen } = useMenuOpen()

  const location = useLocation()
  const navigate = useNavigate()

  const isHome = location.pathname === '/'

  const handleBack = () => navigate(-1)

  return (
    <StyledAppBar data-testid='Appbar'>
      <Toolbar>
        {isHome
          ? <HomeButton startIcon={<EmojiEmotionsTwoToneIcon />}>keenq</HomeButton>
          : <BackButton startIcon={<ArrowBackIosNewTwoToneIcon />} onClick={handleBack}>Back</BackButton>}
        <Space grow />
        <IconButton onClick={setMenuOpen(true)}>
          <MenuTwoToneIcon />
        </IconButton>
        <AppbarMenu open={open} toggleMenuOpen={setMenuOpen} />
      </Toolbar>
    </StyledAppBar>
  )
}

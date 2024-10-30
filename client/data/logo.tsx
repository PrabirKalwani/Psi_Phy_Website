import { chakra, HTMLChakraProps, useColorModeValue } from '@chakra-ui/react'

export const Logo: React.FC<HTMLChakraProps<'img'>> = (props) => {
  const color = useColorModeValue('#231f20', '#fff')
  const logoSrc = useColorModeValue('/static/favicons/apple-icon-60x60.png', '/static/favicons/apple-icon-60x60.png')

  return (
    <chakra.img
      src={logoSrc}
      alt="Logo"
      {...props}  // spread the rest of the props if needed
    />
  )
}

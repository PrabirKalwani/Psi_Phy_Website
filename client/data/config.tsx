import { Button } from '@chakra-ui/react'
import { Link } from '@saas-ui/react'
import { FaGithub, FaTwitter } from 'react-icons/fa'
import { FiCheck } from 'react-icons/fi'
import { Logo } from './logo'

const siteConfig = {
  logo: Logo,

  header: {
    links: [

      {
        id: 'faq',
        label: 'FAQ',
      },
      {
        label: 'Login',
        href: '/login',
      },
      {
        label: 'Sign Up',
        href: '/signup',
        variant: 'primary',
      },
    ],
  },
  footer: {
    copyright: (
      <>
       PsiPhy 2024
      </>
    ),
    links: [
      {
        href: 'mailto:prabir.kalwani@gmail.com',
        label: 'Contact',
      },
      {
        href: 'https://twitter.com/prabirkalwani',
        label: <FaTwitter size="14" />,
      },

    ],
  },

}

export default siteConfig

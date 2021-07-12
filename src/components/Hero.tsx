import { Flex, Heading } from '@chakra-ui/react'

export const Hero = ({ title }: any) => (
  <Flex justifyContent="center" alignItems="center" height="100vh">
    <Heading
      fontSize="sm"
      bgClip="border-box"
    >
      {title}
    </Heading>
  </Flex>
)

Hero.defaultProps = {
  title: 'sg-uni-hacks',
}

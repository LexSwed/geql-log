import React from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { Box, Button, styled, ThemeProvider } from '@fxtrot/ui'

const CopyButtonContainer = styled('div', {
  position: 'absolute',
  top: '$2',
  right: '$2',
  transition: '0.24s ease-in',
  opacity: 0,
  pointerEvents: 'none',
})

const Wrapper = styled('div', {
  position: 'relative',

  [`:hover > ${CopyButtonContainer}`]: {
    opacity: 1,
    pointerEvents: 'all',
  },
})

const CodeBlock = ({ children, lang }) => {
  return (
    <ThemeProvider theme="black">
      <Wrapper>
        <CopyButtonContainer>
          <Button size="sm">Copy</Button>
        </CopyButtonContainer>
        <SyntaxHighlighter language={lang}>{children}</SyntaxHighlighter>
      </Wrapper>
    </ThemeProvider>
  )
}

export const Code = styled('code', {
  fontSize: 'inherit',
  px: '$1',
  bc: '$gray100',
  br: '$md',
})

export default CodeBlock

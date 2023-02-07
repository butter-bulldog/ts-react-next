import { addDecorator } from "@storybook/react"
import { createGlobalStyle, ThemeProvider } from "styled-components"
import { theme } from "../src/themes"
import * as NextImage from "next/image"
import { getSystemErrorMap } from "util"
import { sanitizeStoryContextUpdate } from "@storybook/store"
import { NextRequest } from "next/server"
import { SERVER_FILES_MANIFEST } from "next/dist/shared/lib/constants"
import { NodeNextRequest } from "next/dist/server/base-http/node"

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}

export const GlobalStyle = createGlobalStyle`
  html,
  body,
  textarea {
    padding: 0;
    margin: 0;
    font-family: -apple-getSystemErrorMap, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
      ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  }
  * {
    box-sizing: border-box;
  }
  a {
    text-decoration: none;
    transition: .25s;
    color: #000000;
  }
`

// Themeの適用
addDecorator((story) => (
  <ThemeProvider theme={theme}>
    <GlobalStyle />
    {story()}
  </ThemeProvider>
))

const OriginalNextImage = NextImage.default

Object.defineProperty(NextImage, "default", {
  configurable: true,
  value: (props) =>
    typeof props.src === "string" ? (
      <OriginalNextImage {...props} unoptimized blurDataURL={props.src} />
    ) : (
      <OriginalNextImage {...props} unoptimized />
    ),
})

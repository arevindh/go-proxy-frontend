import { nextui } from '@nextui-org/theme'

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    // './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'
    './node_modules/@nextui-org/theme/dist/components/(button|code|input|kbd|link|listbox|navbar|popover|snippet|spacer|spinner|toggle|tabs|ripple|divider).js'
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [nextui({
    themes: {
      light: {
        colors: {
          primary: {
            DEFAULT: "#BEF264",
            foreground: "#000000",
          }
        },
      },
      dark: {
        colors: {
          primary: {
            DEFAULT: "#002e62",
            foreground: "#000000",
          }
        },
      },
    },
  })],
}

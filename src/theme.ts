import { createTheme, MantineColorsTuple } from '@mantine/core'
const primary: MantineColorsTuple = [
	'#fffbe0',
	'#fff5cb',
	'#fdea9b',
	'#fcde66',
	'#fbd43a',
	'#facd1d',
	'#faca07',
	'#deb200',
	'#c69e00',
	'#ab8800',
]
export const theme = createTheme({
	colors: {
		primary,
	},
	primaryColor: 'primary',
	fontFamily: '"Poppins", sans-serif',
})

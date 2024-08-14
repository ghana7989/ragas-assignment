import { MantineProvider } from '@mantine/core'
import '@mantine/core/styles.css'
import '@xyflow/react/dist/style.css'

import EvaluationLogs from './EvaluationLogs/EvaluationLogs'
import { theme } from './theme'

export default function App() {
	return (
		<MantineProvider theme={theme} defaultColorScheme='dark'>
			<EvaluationLogs />
		</MantineProvider>
	)
}

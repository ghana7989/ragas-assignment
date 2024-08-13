import '@mantine/core/styles.css'
import { MantineProvider } from '@mantine/core'
import { theme } from './theme'
import EvaluationTable from './EvaluationTable'

export default function App() {
	return (
		<MantineProvider theme={theme}>
			<EvaluationTable />
		</MantineProvider>
	)
}

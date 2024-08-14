import EvaluationTable from './components/EvaluationTable'
import { EvaluationLogsProvider } from './context/EvaluationLogs.context'

export default function EvaluationLogs() {
	return (
		<EvaluationLogsProvider>
			<EvaluationTable />
		</EvaluationLogsProvider>
	)
}

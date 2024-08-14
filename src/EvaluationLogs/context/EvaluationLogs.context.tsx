import {
	createContext,
	FC,
	ReactNode,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useState,
} from 'react'
import { evaluationJSONUrl } from '../constants'
import { EvaluationLog, LogData } from '../types'

type EvaluationLogsContextValue = {
	selectedRow: EvaluationLog | null
	handleSelectRow: (row: EvaluationLog) => void
	evaluationData: LogData | null
	getAllChildren: (runId: string) => EvaluationLog[]
}

export const EvaluationLogsContext = createContext<
	EvaluationLogsContextValue | undefined
>(undefined)

export const EvaluationLogsProvider: FC<{
	children: ReactNode | ReactNode[]
}> = ({ children }) => {
	const [row, setRow] =
		useState<EvaluationLogsContextValue['selectedRow']>(null)
	const [data, setData] = useState<LogData | null>(null)

	const handleSelectRow = (row: EvaluationLog) => {
		setRow(row)
	}

	useEffect(() => {
		fetch(evaluationJSONUrl)
			.then((response) => response.json())
			.then((jsonData) => setData(jsonData))
			.catch((error) => console.error('Error fetching the JSON data:', error))
	}, [])

	const getAllChildren = (id: string) => {
		const children = []
		if (!data) return
		const keys = Object.keys(data)
		for (const key of keys) {
			if (data[key].parent_run_id === id) {
				children.push({
					type: data[key].type,
					id: key,
					data: {
						...data[key],
					},
				})
				if (data[key].type === 'chain') {
					children.push(...getAllChildren(key))
				}
			}
		}
		return children
	}

	return (
		<EvaluationLogsContext.Provider
			value={{
				selectedRow: row,
				handleSelectRow,
				evaluationData: data,
				getAllChildren,
			}}
		>
			{children}
		</EvaluationLogsContext.Provider>
	)
}

export const useEvaluationLogs = () => {
	const context = useContext(EvaluationLogsContext)
	if (context === undefined) {
		throw new Error(
			'useEvaluationLogs must be used within an EvaluationLogsProvider'
		)
	}
	return context
}

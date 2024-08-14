export interface EvaluationLog {
	id: string
	question?: string
	groundTruth?: string
	answer?: string
	contexts?: string
	faithfulness?: number
}

export interface LogData {
	[run_id: string]: {
		parent_run_id: string | null
		inputs: {
			question?: string
			ground_truth?: string
			answer?: string
		}
		outputs: {
			faithfulness?: number
			answer?: string
		}
		self: {
			name: string
		}
		type: string
	}
}

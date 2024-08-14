export interface ChainType {
	parent_run_id: string
	inputs: {
		question: string
		ground_truth: string
		answer: string
		contexts: string[]
	}
	self: {
		name: string
	}
	type: string
	outputs: {
		output: number
	}
}

export interface LLMType {
	self: {
		lc: number
		type: string
		id: string[]
		kwargs: Kwargs
		name: string
		graph: Graph
	}
	inputs: string
	parent_run_id: string
	type: string
	outputs: string
}
interface Graph {
	nodes: Node[]
	edges: Edge[]
}
interface Edge {
	source: number
	target: number
}
interface Node {
	id: number
	type: string
	data: Datum | string
}
interface Datum {
	id: string[]
	name: string
}
interface Kwargs {
	model_name: string
	temperature: number
	openai_api_key: Openaiapikey
	openai_proxy: string
	request_timeout: number
	max_retries: number
	n: number
}
interface Openaiapikey {
	lc: number
	type: string
	id: string[]
}

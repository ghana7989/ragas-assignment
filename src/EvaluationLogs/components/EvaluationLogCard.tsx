import React from 'react'
import {
	Card,
	Accordion,
	Text,
	Code,
	Group,
	Divider,
	Pill,
	PillGroup,
} from '@mantine/core'
import { ChainType, LLMType } from './types'
import MiniGraph from './MiniGraph'

interface EvaluationLogProps {
	data: any // This would be your structured JSON data
}

const EvaluationLogCard: React.FC<EvaluationLogProps> = ({ data }) => {
	const isChainType = data.type === 'chain'
	const isLlmType = data.type === 'llm'
	if (isChainType)
		return (
			<Card shadow='sm' padding='lg' style={{ margin: '20px 0' }}>
				<Text size='xl' fw='bolder' c='green'>
					Run Type - Chain
				</Text>
				<Divider />
				{isChainType && (
					<Group align='flex-start' style={{ marginTop: '20px' }}>
						<Text size='xl' fw='bold'>
							Name - {data.self.name}
						</Text>
						<Group>
							<Text size='md' fw='400' variant='text'>
								Ground Truth:{' '}
							</Text>
							<Code>{(data as ChainType).inputs?.ground_truth || 'N/A'}</Code>
						</Group>
						<Text size='md' fw='400'>
							Output:{' '}
						</Text>
						<Code>
							{(data as ChainType).outputs?.output !== undefined
								? String((data as ChainType).outputs.output)
								: 'N/A'}
						</Code>
					</Group>
				)}
			</Card>
		)
	else if (isLlmType) {
		const llmData = data as LLMType
		console.log(llmData.self.graph)
		return (
			<Card shadow='sm' padding='lg' style={{ margin: '20px 0' }}>
				<Text size='xl' fw='bolder' c='indigo'>
					Run Type - LLM
				</Text>
				<Divider />
				<Accordion style={{ marginTop: '20px' }}>
					<Accordion.Item value='Self'>
						<Accordion.Control>Self</Accordion.Control>
						<Accordion.Panel>
							<PillGroup title='Self'>
								<Pill size='md' fw='400'>
									Model: {llmData.self.kwargs.model_name}
								</Pill>

								<Pill size='md' fw='400'>
									Temperature: {llmData.self.kwargs.temperature}
								</Pill>

								<Pill size='md' fw='400'>
									Request Timeout: {llmData.self.kwargs.request_timeout} seconds
								</Pill>

								<Pill size='md' fw='400'>
									Max Retries: {llmData.self.kwargs.max_retries}
								</Pill>
							</PillGroup>
						</Accordion.Panel>
					</Accordion.Item>

					<Accordion.Item value='Graph Structure'>
						<Accordion.Control>Graph Structure</Accordion.Control>
						<Accordion.Panel>
							<MiniGraph graphData={llmData.self.graph} />
							{/* <Group>
								{llmData.self.graph.nodes.map((node, index) => (
									<Text key={index}>
										Node {index + 1}: {node.type} -{' '}
										{typeof node.data === 'string' ? node.data : node.data.name}
									</Text>
								))}
							</Group> */}
						</Accordion.Panel>
					</Accordion.Item>

					<Accordion.Item value='Inputs'>
						<Accordion.Control>Inputs</Accordion.Control>
						<Accordion.Panel>
							<Code block>{llmData.inputs}</Code>
						</Accordion.Panel>
					</Accordion.Item>

					<Accordion.Item value='Outputs'>
						<Accordion.Control>Outputs</Accordion.Control>
						<Accordion.Panel>
							<Code block>{llmData.outputs}</Code>
						</Accordion.Panel>
					</Accordion.Item>
				</Accordion>
			</Card>
		)
	}

	return null // Fallback in case the type is neither 'chain' nor 'llm'
}

export default EvaluationLogCard

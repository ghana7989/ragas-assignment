import React, { useEffect, useState } from 'react'
import { Table } from '@mantine/core'
import { LogData } from './types'
import { truncate } from './utils'
const jsonUrl =
	'https://file.notion.so/f/f/d1a87851-67ca-4655-9644-5cb258194cb9/8e168a51-0fab-4a10-8e96-7817c623f6bd/evaluation_logs.json?table=block&id=22d44928-ca53-495c-921f-9cbed2a780b9&spaceId=d1a87851-67ca-4655-9644-5cb258194cb9&expirationTimestamp=1723636800000&signature=mg-CiBuKpxsSW8HqdlIIpZEDdBme79-w9NM-_YVn7G0&downloadName=evaluation_logs.json'
const EvaluationTable: React.FC = () => {
	const [data, setData] = useState<LogData | null>(null)

	useEffect(() => {
		fetch(jsonUrl)
			.then((response) => response.json())
			.then((jsonData) => setData(jsonData))
			.catch((error) => console.error('Error fetching the JSON data:', error))
	}, [])

	if (!data) {
		return <div>Loading...</div>
	}

	return (
		<Table striped highlightOnHover>
			<thead>
				<tr>
					<th>Question</th>
					<th>Ground Truth</th>
					<th>Answer</th>
					{/* <th>Contexts</th> */}
					<th>Faithfulness</th>
				</tr>
			</thead>
			<tbody>
				{Object.entries(data).map(([, row], index) => {
					if (row.self.name.startsWith('row'))
						return (
							<tr key={index}>
								<td>{truncate(row.inputs.question) || 'N/A'}</td>
								<td>{truncate(row.inputs.ground_truth) || 'N/A'}</td>
								<td>{truncate(row.inputs.answer) || 'N/A'}</td>
								{/* <td>{row.self.name || 'N/A'}</td> */}
								<td>{row.outputs.faithfulness?.toFixed(6)}</td>
							</tr>
						)
				})}
			</tbody>
		</Table>
	)
}

export default EvaluationTable

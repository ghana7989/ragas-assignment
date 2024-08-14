import React, { useMemo } from 'react'

import {
	ColumnDef,
	flexRender,
	getCoreRowModel,
	useReactTable,
} from '@tanstack/react-table'

import RunDrawer from './RunDrawer'
import { truncate } from '../../utils'
import { useEvaluationLogs } from '../context/EvaluationLogs.context'
import { EvaluationLog } from '../types'

const EvaluationTable: React.FC = () => {
	const { evaluationData: data } = useEvaluationLogs()

	const columns = useMemo<ColumnDef<any>[]>(
		() => [
			{
				header: 'Question',
				accessorKey: 'question',
				cell: (info) => truncate(info.getValue() as string) || 'N/A',
			},
			{
				header: 'Ground Truth',
				accessorKey: 'groundTruth',
				cell: (info) => truncate(info.getValue() as string) || 'N/A',
			},
			{
				header: 'Answer',
				accessorKey: 'answer',
				cell: (info) => truncate(info.getValue() as string) || 'N/A',
			},
			{
				header: 'Faithfulness',
				accessorKey: 'faithfulness',
				cell: (info) =>
					info.getValue() !== undefined
						? (info.getValue() as number).toFixed(6)
						: 'N/A',
			},
			{
				header: 'Actions',
				cell: (info) => {
					return <RunDrawer selectedRow={info.row.original} />
				},
			},
		],
		[]
	)

	const filteredData: EvaluationLog[] = useMemo(
		() =>
			Object.entries(data || {})
				.filter(([, row]) => row.self.name.startsWith('row'))
				.map(([id, row]) => ({
					id: id,
					question: row.inputs.question,
					groundTruth: row.inputs.ground_truth,
					answer: row.inputs.answer,
					faithfulness: row.outputs.faithfulness,
				})),
		[data]
	)

	const table = useReactTable({
		data: filteredData,
		columns,
		getCoreRowModel: getCoreRowModel(),
	})

	if (!data) {
		return <div>Loading...</div>
	}

	return (
		<>
			<div className='container mx-auto my-12'>
				<table>
					<thead>
						{table.getHeaderGroups().map((headerGroup) => (
							<tr key={headerGroup.id}>
								{headerGroup.headers.map((header) => (
									<th
										key={header.id}
										colSpan={header.colSpan}
										className='px-4 pr-2 py-4 font-medium text-left'
									>
										{header.isPlaceholder
											? null
											: flexRender(
													header.column.columnDef.header,
													header.getContext()
											  )}
									</th>
								))}
							</tr>
						))}
					</thead>
					<tbody>
						{table.getRowModel().rows.map((row) => (
							<tr key={row.id} className='border-b-2'>
								{row.getVisibleCells().map((cell) => (
									<td key={cell.id} className='px-4 pt-[14px] pb-[18px]'>
										{flexRender(cell.column.columnDef.cell, cell.getContext())}
									</td>
								))}
							</tr>
						))}
					</tbody>
					<tfoot>
						{table.getFooterGroups().map((footerGroup) => (
							<tr key={footerGroup.id}>
								{footerGroup.headers.map((header) => (
									<th key={header.id}>
										{header.isPlaceholder
											? null
											: flexRender(
													header.column.columnDef.footer,
													header.getContext()
											  )}
									</th>
								))}
							</tr>
						))}
					</tfoot>
				</table>
			</div>
		</>
	)
}

export default EvaluationTable

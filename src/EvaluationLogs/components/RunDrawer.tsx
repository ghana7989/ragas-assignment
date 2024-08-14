import { Button, Drawer } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { EvaluationLog } from '../types'
import { useEvaluationLogs } from '../context/EvaluationLogs.context'
import EvaluationLogCard from './EvaluationLogCard'
interface RunDrawerProps {
	selectedRow: EvaluationLog | null
}

type Child = {
	id: string
	data: any
	type: string
}

export default function RunDrawer({ selectedRow }: RunDrawerProps) {
	const [opened, { open, close }] = useDisclosure(false)
	const { getAllChildren } = useEvaluationLogs()
	return (
		<>
			<Drawer
				opened={opened}
				onClose={close}
				title='Run Description'
				position='right'
				size='xl'
			>
				{getAllChildren(selectedRow?.id).map((child: Child, idx) => {
					return <EvaluationLogCard data={child.data} key={idx} />
				})}
			</Drawer>
			<Button onClick={open}>Open Drawer</Button>
		</>
	)
}

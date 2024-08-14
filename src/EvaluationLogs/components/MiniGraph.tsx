import React from 'react'
import { ReactFlow, Node, Edge, Background, Controls } from '@xyflow/react'

interface GraphData {
	nodes: {
		id: number
		type: string
		data: any
	}[]
	edges: {
		source: number
		target: number
	}[]
}

const MiniGraph: React.FC<{ graphData: GraphData }> = ({ graphData }) => {
	const nodes: Node[] = graphData.nodes.map((node, index) => ({
		id: node.id.toString(),
		type: node.type,
		data: {
			label: typeof node.data === 'string' ? node.data : node.data.name,
		},
		position: {
			x: 100,
			y: 100 * index,
		}, // Simple layout; you may want to use a layout library
	}))

	// Transforming edges to React Flow format
	const edges: Edge[] = graphData.edges.map((edge) => ({
		id: `${edge.source}-${edge.target}`,
		source: edge.source.toString(),
		target: edge.target.toString(),
	}))

	return (
		<div style={{ height: 350 }}>
			<ReactFlow
				nodes={nodes}
				edges={edges}
				nodesDraggable={true}
				nodesConnectable={false}
				elementsSelectable={true}
				snapToGrid={true}
				snapGrid={[15, 15]}
				fitView
				colorMode='dark'
				proOptions={{
					hideAttribution: true,
				}}
			>
				<Background gap={16} />
				<Controls />
			</ReactFlow>
		</div>
	)
}

export default MiniGraph

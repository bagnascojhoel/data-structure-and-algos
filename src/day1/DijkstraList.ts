import MinHeap from "./MinHeap"

// ### With seen array
// function hasUnseen(seenArr: boolean[]): boolean {
//   return seenArr.includes(false)
// }

// function getNearestUnseen(seen: boolean[], distances: number[]): number {
//   let nearestEdge: number = -1;
//   for (let i = 0; i < seen.length; i++) {
//     if (seen[i]) {
//       continue
//     }

//     if (nearestEdge === -1 || distances[nearestEdge] > distances[i]) {
//       nearestEdge = i;
//     }
//   }
//   return nearestEdge
// }

// export default function dijkstra_list(
//   source: number,
//   sink: number,
//   graph: WeightedAdjacencyList
// ): number[] {
//   const prev: number[] = new Array(graph.length).fill(-1)
//   const seen: boolean[] = new Array(graph.length).fill(false)
//   const distances: number[] = new Array(graph.length).fill(Infinity)

//   distances[source] = 0

//   let nearestUnseenEdge: number
//   let vertices: GraphEdge[]
//   let distance: number
//   while (hasUnseen(seen)) {
//     nearestUnseenEdge = getNearestUnseen(seen, distances)

//     if (nearestUnseenEdge === sink) {
//       break
//     }

//     seen[nearestUnseenEdge] = true
//     vertices = graph[nearestUnseenEdge]
//     for (let vertexIndex = 0; vertexIndex < vertices.length; vertexIndex++) {
//       if (seen[vertices[vertexIndex].to]) {
//         continue
//       }

//       // distance until current edge + distance until "next edge"
//       distance = distances[nearestUnseenEdge] + vertices[vertexIndex].weight

//       if (distance < distances[vertices[vertexIndex].to]) {
//         distances[vertices[vertexIndex].to] = distance
//         prev[vertices[vertexIndex].to] = nearestUnseenEdge
//       }
//     }
//   }
//   let previousEdge = sink
//   const shortestPath = []
//   while (previousEdge > -1) {
//     shortestPath.push(previousEdge)
//     previousEdge = prev[previousEdge]
//   }
//   return shortestPath.reverse()
// }

// ### With PriorityQueue 
type PrioritizedEdge = { index: number }
export default function dijkstra_list(
  source: number,
  sink: number,
  graph: WeightedAdjacencyList
): number[] {
  const prev: number[] = new Array(graph.length).fill(-1)
  const distances: number[] = new Array(graph.length).fill(Infinity)
  const priorityQueue: MinHeap<PrioritizedEdge> = new MinHeap()

  priorityQueue.insert(0, { index: source })
  distances[source] = 0

  let nearestUnseenEdge: PrioritizedEdge
  let adjacentVertices: GraphEdge[]
  let distance: number
  while (priorityQueue.length > 0) {
    nearestUnseenEdge = priorityQueue.delete()
    if (nearestUnseenEdge.index === sink) {
      break
    }

    adjacentVertices = graph[nearestUnseenEdge.index]
    for (let i = 0; i < adjacentVertices.length; i++) {
      // distance until current edge + distance until "next edge"
      distance = distances[nearestUnseenEdge.index] + adjacentVertices[i].weight


      // only adds to PQ if distance is smaller considering the distance to arrive at current vertex
      if (distance < distances[adjacentVertices[i].to]) {
        distances[adjacentVertices[i].to] = distance
        prev[adjacentVertices[i].to] = nearestUnseenEdge.index
        priorityQueue.insert(distance, { index: adjacentVertices[i].to })
      }
    }
  }

  let previousEdge = sink
  const shortestPath = []
  while (previousEdge > -1) {
    shortestPath.push(previousEdge)
    previousEdge = prev[previousEdge]
  }
  return shortestPath.reverse()
}


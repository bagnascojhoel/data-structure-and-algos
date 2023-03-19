function hasUnseen(seenArr: boolean[]): boolean {
  return seenArr.includes(false)
}

function getNearestUnseen(seen: boolean[], distances: number[]): number {
  let nearestEdge: number = -1;
  for (let i = 0; i < seen.length; i++) {
    if (seen[i]) {
      continue
    }

    if (nearestEdge === -1 || distances[nearestEdge] > distances[i]) {
      nearestEdge = i;
    }
  }
  return nearestEdge
}

export default function dijkstra_list(
  source: number,
  sink: number,
  graph: WeightedAdjacencyList
): number[] {
  const prev: number[] = new Array(graph.length).fill(-1)
  const seen: boolean[] = new Array(graph.length).fill(false)
  const distances: number[] = new Array(graph.length).fill(Infinity)

  distances[source] = 0

  let nearestUnseenEdge: number
  let vertices: GraphEdge[]
  let distance: number
  while (hasUnseen(seen)) {
    nearestUnseenEdge = getNearestUnseen(seen, distances)

    if (nearestUnseenEdge === sink) {
      break
    }

    seen[nearestUnseenEdge] = true
    vertices = graph[nearestUnseenEdge]
    for (let vertexIndex = 0; vertexIndex < vertices.length; vertexIndex++) {
      if (seen[vertices[vertexIndex].to]) {
        continue
      }

      // distance until current edge + distance until "next edge"
      distance = distances[nearestUnseenEdge] + vertices[vertexIndex].weight

      if (distance < distances[vertices[vertexIndex].to]) {
        distances[vertices[vertexIndex].to] = distance
        prev[vertices[vertexIndex].to] = nearestUnseenEdge
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


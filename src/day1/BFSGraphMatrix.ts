export default function bfs(graph: WeightedAdjacencyMatrix, source: number, needle: number): number[] | null {
  const visitingQueue: number[] = [];
  const hasVisited: boolean[] = [];
  const previous: (number | undefined)[] = [];

  visitingQueue.push(source);
  previous[source] = undefined;

  do {
    const currentEdge = visitingQueue.shift() as number;
    if (currentEdge === needle) {
      break;
    }

    hasVisited[currentEdge] = true;
    const adjacencies = graph[currentEdge];
    const connectedEdges: number[] = []
    for (let anotherEdge = 0; anotherEdge < adjacencies.length; anotherEdge++) {
      // weight === 0 means no vertice between the edges
      // if has been visited no need to go to it
      if (adjacencies[anotherEdge] === 0 || hasVisited[anotherEdge] === true) {
        // go to next edge
        continue;
      }
      connectedEdges.push(anotherEdge);
    }

    // insert edges into queue sorted by most weight
    connectedEdges.sort((a, b) => a >= b ? -1 : 1)
      .forEach((edge) => {
        previous[edge] = currentEdge
        visitingQueue.push(edge);
      });
  } while (visitingQueue.length > 0)


  if (previous[needle] === undefined) {
    return null
  } else {
    // rebuild the array
    const result = [];
    let edge: number | undefined = needle;
    while (edge !== undefined) {
      result.push(edge);
      edge = previous[edge];
    }

    return result.reverse();
  }
}
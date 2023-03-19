
export default function dfs(
  graph: WeightedAdjacencyList,
  source: number,
  needle: number
): number[] | null {
  const stack = [source]
  const previous: (number | undefined)[] = []
  const seen: boolean[] = []

  let curr: number
  do {
    curr = stack.pop() as number
    if (curr === needle) {
      break
    }

    if (seen[curr]) {
      continue
    }

    seen[curr] = true

    // insert connected edges into stack by less weight
    graph[curr].sort((a, b) => a.weight - b.weight)
      .forEach(adj => {
        // needs this conditional to not override the previous record when cyclic graphs happen
        if (!seen[adj.to]) {
          previous[adj.to] = curr
          stack.push(adj.to)
        }
      })
  } while (stack.length > 0)

  // if needle doesn't have a previous it was never reached
  if (previous[needle] === undefined) {
    return null
  }

  const result: number[] = []
  let edge: number | undefined = needle
  while (edge !== undefined) {
    result.push(edge)
    edge = previous[edge]
  }

  return result.reverse();
}
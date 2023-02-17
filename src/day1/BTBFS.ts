export default function bfs(head: BinaryNode<number>, needle: number): boolean {
  if (head.value === needle) return true;

  const left = head.left?.value === needle;
  const right = head.right?.value === needle;
  if (left || right) return true;

  const leftSearch = head.left ? bfs(head.left, needle) : false
  const rightSearch = head.right ? bfs(head.right, needle) : false;
  return leftSearch || rightSearch;
}
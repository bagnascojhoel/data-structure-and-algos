export default function dfs(head: BinaryNode<number>, needle: number): boolean {
  if (head.value === needle) return true;
  if (head.value > needle && head.left) return dfs(head.left, needle);
  else if (head.value < needle && head.right) return dfs(head.right, needle);
  return false;
}
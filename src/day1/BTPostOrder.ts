export default function post_order_search(head: BinaryNode<number>): number[] {
  const result: number[] = [];

  if (head.left) result.push(...post_order_search(head.left));
  if (head.right) result.push(...post_order_search(head.right));
  result.push(head.value);

  return result;
}
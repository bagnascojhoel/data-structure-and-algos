export default function compare(a: BinaryNode<number> | null | undefined, b: BinaryNode<number> | null | undefined): boolean {
  if (!a && !b) return true;
  if ((a && !b) || (!a && b)) return false;
  if (a?.value !== b?.value) return false;

  let leftIsEqual = compare(a?.left, b?.left);
  let rightIsEqual = compare(a?.right, b?.right);

  return leftIsEqual && rightIsEqual;
}
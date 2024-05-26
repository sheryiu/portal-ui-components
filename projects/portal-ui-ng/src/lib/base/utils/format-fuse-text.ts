export function formatFuseText(text: string, indices: readonly [number, number][]) {
  const v = text.split('');
  indices.map((index, i) => {
    v.splice(index[0] + i * 2, 0, '<strong>')
    v.splice(index[1] + 2 + i * 2, 0, '</strong>')
  })
  return v.join('');
}
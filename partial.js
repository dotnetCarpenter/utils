export default function partial (f, ...xs) { return f.bind(null, ...xs) }

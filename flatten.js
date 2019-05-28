export default function flatten(array) {
    if (!Array.isArray(array)) return [array]
    return array.reduce((a,b) => a.concat(flatten(b)), [])
}

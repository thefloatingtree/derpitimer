
export default function TagFactory (name, negated = false) {
    name = name.toLocaleLowerCase()
    return {
        name,
        negated
    }
}
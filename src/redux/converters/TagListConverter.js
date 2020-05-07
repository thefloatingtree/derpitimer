export default function TagListConverter(tags) {
    return tags.map((tag) => {
        return tag.negated ? "-" + tag.name : tag.name
    })
}
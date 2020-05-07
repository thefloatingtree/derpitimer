import TagGroupFactory from '../../redux/factories/TagGroupFactory'
import TagFactory from '../../redux/factories/TagFactory'

export default function DefaultTagGroupsFactory() {
    return [
        TagGroupFactory("Just Twilight", [TagFactory("ts"), TagFactory("solo"), TagFactory("safe"), TagFactory("pony"), TagFactory("animated", true)], 0, "Default")
    ]
}
import React from 'react'
import { connect } from 'react-redux'
import { removeTag, setTags } from '../../redux/actions'
import tagFactory from '../../redux/factories/TagFactory'
import './TagDisplay.scss'
import classnames from 'classnames'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

function TagDisplay({ tags, removeTag, setTags }) {

    // Event for the whole tag, including the delete button
    const onTagClick = (item, event) => {
        // Check if clicked on tag or delete button
        if (event.target.classList[0] === "tag") {
            // Toggle negated
            setTags(tags.map((tag) => {
                if (tag.name === item.name) {
                    return tagFactory(tag.name, !tag.negated)
                }
                return tag
            }))
        } else {
            removeTag(item.name)
        }
    }

    return (
        <div className="tags are-medium">
            {tags.map((item, index) => {
                return (
                    <span onClick={onTagClick.bind(this, item)} key={index} className={classnames("tag", "selectable-tag", { ["is-info"]: !item.negated }, { ["is-danger"]: item.negated })}>
                        {item.negated && "-"}
                        {item.name}
                        <button className="delete is-small"></button>
                    </span>
                )
            })}
            {!!tags.length &&
                <div className="tag tag-button">
                    <span className="icon">
                        <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
                    </span>
                    <span>Group These Tags</span>
                </div>
            }
        </div>
    )
}

const mapStateToProps = state => ({
    tags: state.start.tags,
})

export default connect(mapStateToProps, { removeTag, setTags })(TagDisplay)
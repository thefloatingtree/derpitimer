import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { removeTag } from '../../redux/actions'

function TagDisplay({ tags, removeTag }) {

    return (
        <div className="tags are-medium">
            {tags.map((item, index) => {
                return (
                    <span key={index} className="tag is-info">
                        {item}
                        <button onClick={() => removeTag(item)} className="delete is-small"></button>
                    </span>
                )
            })}
        </div>
    )
}

const mapStateToProps = state => ({
    tags: state.start.tags,
})

export default connect(mapStateToProps, { removeTag })(TagDisplay)
import React from 'react'
import { connect } from 'react-redux'
import { addTagGroup } from '../../redux/actions'
import TagGroupFactory from '../../redux/factories/TagGroupFactory'
import classnames from 'classnames'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

function TagGroupDisplay({ tagGroups }) {

    return (
        tagGroups.map(group => {
            return (
                <div className="box">
                    <div className="title">
                        {group.name}
                    </div>
                    <div className="tags">
                        {group.tags.map(tag => {
                            return <div className={classnames("tag", { ["is-info"]: !tag.negated }, { ["is-danger"]: tag.negated })}>{tag.name}</div>
                        })}
                    </div>
                </div>
            )
        })
    )
}

const mapStateToProps = state => ({
    tagGroups: state.start.tagGroups,
})

export default connect(mapStateToProps, { addTagGroup })(TagGroupDisplay)
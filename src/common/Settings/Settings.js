import React from 'react'
import { connect } from 'react-redux'
import classnames from 'classnames'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faStopwatch } from '@fortawesome/free-solid-svg-icons'

import { fetchImagesByTagsAsync } from '../../redux/slices/start/startThunks'

export function Settings({ tags, imagePreviewsPending, fetchImagesByTagsAsync }) {
    return (
        <div>
            <div className="field is-grouped">
                <div className="control">
                    <div onClick={() => { fetchImagesByTagsAsync(tags) }} className={classnames("button", "is-info", { ["is-loading"]: imagePreviewsPending })}>
                        <div className="icon">
                            <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>
                        </div>
                        <span>Preview</span>
                    </div>
                </div>
                <div className="control">
                    <div className={classnames("button", "is-primary")}>
                        <div className="icon">
                            <FontAwesomeIcon icon={faStopwatch}></FontAwesomeIcon>
                        </div>
                        <span>Go</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    tags: state.start.tags,
    imagePreviewsPending: state.start.imagePreviewsPending
})

const mapDispatchToProps = {
    fetchImagesByTagsAsync
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings)

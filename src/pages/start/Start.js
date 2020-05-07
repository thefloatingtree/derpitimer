import React, { useState } from 'react'
import { connect } from 'react-redux'

import TagSearch from '../../common/TagSearch/TagSearch'
import TagDisplay from '../../common/TagDisplay/TagDisplay'
import TagGroupDisplay from '../../common/TagGroupDisplay/TagGroupDisplay'
import ImagePreview from '../../common/ImagePreview/ImagePreview'
import Settings from '../../common/Settings/Settings'

import UpdateTagGroupCookie from '../../common/renderless/UpdateTagGroupCookie'

import CreateTagGroupModal from '../../common/modals/CreateTagGroupModal'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter } from '@fortawesome/free-brands-svg-icons'

export const Start = () => {

    const [showTagGroups, setShowTagGroups] = useState(true)

    return (
        <>
            {/* Renderless */}
            <UpdateTagGroupCookie></UpdateTagGroupCookie>
            {/* Modals */}
            <CreateTagGroupModal></CreateTagGroupModal>
            <div className="container">
                <div className="section">
                    <div className="level">
                        <div className="level-left">
                            <div className="title">Derpitimer</div>
                        </div>
                        <div className="level-right">
                            <div className="level-item">
                                <div className="subtitle has-text-grey">
                                    made by thefloatingtree
                                </div>
                            </div>
                            <div className="level-item">
                                <div onClick={() => { window.location.href = "https://twitter.com/thefloatingtree" }} className="button is-primary">
                                    <FontAwesomeIcon icon={faTwitter}></FontAwesomeIcon>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="columns">
                        <div className="column">
                            <TagSearch></TagSearch>
                            <TagDisplay></TagDisplay>
                            <div className="level is-mobile">
                                <div className="level-left">
                                    <div className="title is-4">Tag Groups</div>
                                </div>
                                <div className="level-right">
                                    <div onClick={() => { setShowTagGroups(!showTagGroups) }} className="button">{showTagGroups ? "Hide" : "Show"}</div>
                                </div>
                            </div>
                            {showTagGroups &&
                                <TagGroupDisplay></TagGroupDisplay>
                            }
                        </div>
                        <div className="column">
                            <div className="field">
                                <Settings></Settings>
                            </div>
                            <ImagePreview></ImagePreview>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(Start)

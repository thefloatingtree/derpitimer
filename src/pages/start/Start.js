import React from 'react'
import { connect } from 'react-redux'

import TagSearch from '../../common/TagSearch/TagSearch'
import TagDisplay from '../../common/TagDisplay/TagDisplay'
import TagGroupDisplay from '../../common/TagGroupDisplay/TagGroupDisplay'

import CreateTagGroupModal from '../../common/modals/CreateTagGroupModal'

export const Start = () => {
    return (
        <>
            <CreateTagGroupModal></CreateTagGroupModal>
            <div className="container">
                <div className="section">
                    <div className="title">Derpitimer</div>
                    <div className="columns">
                        <div className="column">
                            <div className="title is-4">Settings</div>
                            <div className="title is-4">Tags</div>
                            <TagSearch></TagSearch>
                            <TagDisplay></TagDisplay>
                            <div className="title is-4">Tag Groups</div>
                            <TagGroupDisplay></TagGroupDisplay>
                        </div>
                        <div className="column">
                            <div className="title is-4">Preview</div>
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

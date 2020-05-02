import React from 'react'
import { connect } from 'react-redux'

import TagSearch from '../../common/TagSearch/TagSearch'
import TagDisplay from '../../common/TagDisplay/TagDisplay'


export const Start = () => {
    return (
        <div className="container">
            <div className="section">
                <div className="columns">
                    <div className="column">
                        <TagSearch></TagSearch>
                        <TagDisplay></TagDisplay>
                    </div>
                    <div className="column">

                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(Start)

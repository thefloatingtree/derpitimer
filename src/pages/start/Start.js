import React from 'react'
import { connect } from 'react-redux'

import TagSearch from '../../common/TagSearch/TagSearch'

export const Start = () => {
    return (
        <div className="container">
            <div className="section">
                <div className="columns">
                    <div className="column">
                        <TagSearch></TagSearch>
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

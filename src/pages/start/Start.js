import React from 'react'
import { connect } from 'react-redux'

import TagInput from '../../common/TagInput/TagInput'

export const Start = () => {
    return (
        <div className="container">
            <div className="section">
                <div className="columns">
                    <div className="column">
                        <TagInput></TagInput>
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

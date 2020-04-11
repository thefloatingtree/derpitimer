import React from 'react'
import { connect } from 'react-redux'

export const Start = () => {
    return (
        <div className="container">
            <div className="section">
                <div className="title">Start</div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(Start)

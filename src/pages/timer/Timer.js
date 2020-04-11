import React from 'react'
import { connect } from 'react-redux'

export const Timer = () => {
    return (
        <div className="container">
            <div className="section">
                <div className="title">Timer</div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(Timer)

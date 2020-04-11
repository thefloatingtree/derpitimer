import React from 'react'
import './TagInput.scss'

export default function TagInput() {
    return (
        <div className="dropdown">
            <div className="field">
                <div className="control">
                    <input className="input" type="text" placeholder="Add a tag" />
                </div>
            </div>
            <div className="dropdown-menu" role="menu">
                <div className="dropdown-content">

                </div>
            </div>
        </div>
    )
}
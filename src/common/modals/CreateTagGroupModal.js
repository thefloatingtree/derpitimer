import React, { useState } from 'react'
import { connect } from 'react-redux'
import classnames from 'classnames'
import { activateStartCreateTagGroup } from '../../redux/slices/modal/modalActions'
import { addTagGroup } from '../../redux/slices/start/startActions'

export function CreateTagGroupModal({ isOpen, activateStartCreateTagGroup, addTagGroup, tags }) {
    const [value, setValue] = useState("")
    const [noNameError, setNoNameError] = useState(false)

    const onKeyPress = event => {
        setNoNameError(false)
        if (event.key === "Enter") {
            createTagGroup()
        }
    }

    const createTagGroup = () => {
        if (!value) return setNoNameError(true)
        addTagGroup({ name: value, tags })
        activateStartCreateTagGroup(false)
    }

    return (
        <div>
            <div class={classnames("modal", { ["is-active"]: isOpen })}>
                <div onClick={() => { activateStartCreateTagGroup(false) }} class="modal-background"></div>
                <div class="modal-content">
                    <div className="box">
                        <div className="field has-addons">
                            <div className="control is-expanded">
                                <input onChange={event => setValue(event.target.value)} onKeyPress={onKeyPress} value={value} className="input" placeholder="Enter a name for your new tag group" />
                                {noNameError &&
                                    <p class="help is-danger">You must enter a name</p>
                                }
                            </div>
                            <div className="control">
                                <div onClick={createTagGroup} className="button is-primary">Make Tag Group</div>
                            </div>
                        </div>
                    </div>
                </div>
                <button onClick={() => { activateStartCreateTagGroup(false) }} class="modal-close is-large" aria-label="close"></button>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    isOpen: state.modal.startCreateTagGroup,
    tags: state.start.tags
})

const mapDispatchToProps = {
    activateStartCreateTagGroup,
    addTagGroup
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateTagGroupModal)

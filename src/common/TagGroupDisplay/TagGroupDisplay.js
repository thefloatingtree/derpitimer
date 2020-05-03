import React, { useState } from 'react'
import { connect } from 'react-redux'
import { setTags, addTag, setTagGroups, removeTagGroup } from '../../redux/actions'
import classnames from 'classnames'
import StackGrid from "react-stack-grid";
import useWindowDimensions from '../hooks/UseWindowDimensions'

import './TagGroupDisplay.scss'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPlus } from '@fortawesome/free-solid-svg-icons'

function TagGroupDisplay({ tagGroups, tags, setTags, addTag, setTagGroups, removeTagGroup }) {
    const [tagGroupDeleteAreYouSure, setTagGroupDeleteAreYouSure] = useState(null)
    const [tagGroupAddOrReplace, setTagGroupAddOrReplace] = useState(null)
    const { width } = useWindowDimensions();

    const resetPrompts = () => {
        setTagGroupAddOrReplace(null)
        setTagGroupDeleteAreYouSure(null)
    }

    const addTags = group => {
        group.tags.forEach((tag) => {
            addTag(tag);
        })
    }

    const onSetTagsClick = group => {
        if (!tags.length) {
            setTags(group.tags)
            setTagGroupAddOrReplace(null);
        } else {
            setTagGroupAddOrReplace(group);
        }
    }

    const onDeleteTagGroupClick = group => {
        setTagGroupDeleteAreYouSure(group)
    }

    return (
        <div className="container">
            <StackGrid columnWidth={width < 500 || (width > 768 && width < 1024) ? "100%" : "50%"}>
                {tagGroups.map(group => {
                    return (
                        <div className="box">
                            <div className={classnames("tab-group-overlay", "hideable", {["hide"]: !(tagGroupAddOrReplace?.name === group.name)})}>
                                <div className="absolute-center">
                                    <div className="title is-5">Tags already exist</div>
                                    <div className="buttons is-grouped">
                                        <div onClick={() => {resetPrompts(); setTags(group.tags)}} className="button">Replace</div>
                                        <div onClick={() => {resetPrompts(); addTags(group)}} className="button is-primary">Add</div>
                                    </div>
                                </div>
                            </div>
                            <div className={classnames("tab-group-overlay", "hideable", {["hide"]: !(tagGroupDeleteAreYouSure?.name === group.name)})}>
                                <div className="absolute-center">
                                    <div className="title is-5">Are you sure?</div>
                                    <div className="buttons is-grouped">
                                        <div onClick={() => {resetPrompts(); removeTagGroup(group)}} className="button is-danger">Delete</div>
                                        <div onClick={() => resetPrompts()} className="button">Cancel</div>
                                    </div>
                                </div>
                            </div>
                            <div className={classnames("hideable", {["hide"]: tagGroupDeleteAreYouSure?.name === group.name || tagGroupAddOrReplace?.name === group.name})}>
                                <div className="columns is-mobile">
                                    <div className="column">
                                        <div className="title is-5">
                                            {group.name}
                                        </div>
                                        <div className="tags">
                                            {group.tags.map(tag => {
                                                return <div className={classnames("tag", { ["is-info"]: !tag.negated }, { ["is-danger"]: tag.negated })}>
                                                    {tag.negated && "-"}
                                                    {tag.name}
                                                </div>
                                            })}
                                        </div>
                                    </div>
                                    <div className="column is-narrow">
                                        <div className="field">
                                            <div onClick={() => onDeleteTagGroupClick(group)} className="button">
                                                <div className="icon">
                                                    <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="field">
                                            <div onClick={() => onSetTagsClick(group)} className="button">
                                                <div className="icon">
                                                    <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </StackGrid>
        </div >
    )
}

const mapStateToProps = state => ({
    tagGroups: state.start.tagGroups,
    tags: state.start.tags,
})

export default connect(mapStateToProps, { setTags, addTag, setTagGroups, removeTagGroup })(TagGroupDisplay)
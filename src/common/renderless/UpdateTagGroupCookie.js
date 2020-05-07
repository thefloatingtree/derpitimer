import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { setTagGroups } from '../../redux/slices/start/startActions'
import DefaultTagGroupsFactory from '../../redux/factories/DefaultTagGroupsFactory'

import Cookies from 'js-cookie'

function UpdateTagGroupCookie({ tagGroups, setTagGroups }) {

    useEffect(() => {
        if (Cookies.get('start/tagGroups')) {
            setTagGroups(JSON.parse(Cookies.get('start/tagGroups')))
        } else {
            setTagGroups(DefaultTagGroupsFactory())
        }
    }, [])

    useEffect(() => {
        Cookies.set('start/tagGroups', JSON.stringify(tagGroups))
    }, [tagGroups])

    return null
}

const mapStateToProps = (state) => ({
    tagGroups: state.start.tagGroups
})

const mapDispatchToProps = {
    setTagGroups
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateTagGroupCookie)

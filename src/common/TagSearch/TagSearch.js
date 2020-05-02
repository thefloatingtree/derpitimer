import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { fetchTagSuggestionsByQueryAsync } from '../../redux/thunks'
import Autosuggest from 'react-autosuggest'
import {
    getSuggestionValue,
    renderSuggestionsContainer,
    renderSuggestion,
    renderInputComponent
} from './TagSearchUtil'
import fuzzysort from 'fuzzysort'

function TagSearch({ tagSuggestions, tagSuggestionsPending, fetchTagSuggestionsByQueryAsync }) {
    const [transformedTagSuggestions, setTransformedTagSuggestions] = useState(tagSuggestions)
    const [value, setValue] = useState('')
    const [exitedTagSuggestionsFetchEarly, setExitedTagSuggestionsFetchEarly] = useState(false)
    const [lastValueChangeMethod, setLastValueChangeMethod] = useState('')
    const [timeLastTyped, setTimeLastTyped] = useState(Date.now())
    const [inputFocused, setInputFocused] = useState(true);


    useEffect(() => {
        if (lastValueChangeMethod === 'type') {
            const preformTransformations = async () => {
                let tempSuggestions = tagSuggestions
                tempSuggestions = (await fuzzysort.goAsync(value, tempSuggestions, { key: 'name' })).map(item => item.obj)
                tempSuggestions = tempSuggestions.slice(0, 5)
                setTransformedTagSuggestions(tempSuggestions)
            }
            preformTransformations()
        }
    }, [tagSuggestions, value, lastValueChangeMethod])

    useEffect(() => {
        if (!tagSuggestionsPending && exitedTagSuggestionsFetchEarly) {
            fetchTagSuggestionsByQueryAsync(value)
            setExitedTagSuggestionsFetchEarly(false)
        }
    }, [tagSuggestionsPending, exitedTagSuggestionsFetchEarly, value, fetchTagSuggestionsByQueryAsync])


    const onSuggestionsFetchRequested = ({ value, reason }) => {
        if (reason === 'input-focused') setInputFocused(true)
        if (reason !== 'input-changed') return
        if (Date.now() - timeLastTyped < 500) return setExitedTagSuggestionsFetchEarly(true)
        if (tagSuggestionsPending) return setExitedTagSuggestionsFetchEarly(true)
        fetchTagSuggestionsByQueryAsync(value)
    }

    const onChange = (event, { newValue, method }) => {
        if (method === "type") setTimeLastTyped(Date.now())
        setLastValueChangeMethod(method)
        setValue(newValue)
    }

    const onSuggestionSelected = event => {
        event.preventDefault()
        setValue("")
    }
    
    const onSuggestionsClearRequested = () => {
        setInputFocused(false)
    }
    

    const inputProps = {
        placeholder: 'Add a tag',
        value,
        onChange
    }

    return (
        <Autosuggest
            suggestions={transformedTagSuggestions}
            onSuggestionsFetchRequested={onSuggestionsFetchRequested}
            onSuggestionSelected={onSuggestionSelected}
            onSuggestionsClearRequested={onSuggestionsClearRequested}
            getSuggestionValue={getSuggestionValue}
            renderSuggestion={renderSuggestion}
            renderInputComponent={inputProps => renderInputComponent(inputProps, tagSuggestionsPending)}
            renderSuggestionsContainer={inputProps => renderSuggestionsContainer(inputProps, tagSuggestionsPending, inputFocused)}
            inputProps={inputProps}
            highlightFirstSuggestion
        />
    )
}

const mapStateToProps = state => ({
    tagSuggestions: state.start.tagSuggestions,
    tagSuggestionsPending: state.start.tagSuggestionsPending
})

export default connect(mapStateToProps, { fetchTagSuggestionsByQueryAsync })(TagSearch)

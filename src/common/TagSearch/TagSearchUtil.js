import React from 'react'
import './TagSearch.scss'
import classnames from 'classnames'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

export const getSuggestionValue = suggestion => suggestion.name;

export const renderSuggestion = (suggestion, { isHighlighted }) => (
    <a href="/" className={classnames("dropdown-item", { ["is-active"]: isHighlighted })}>
        <div className="field is-grouped">
            <div className="control">
                <span className="icon">
                    <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
                </span>
            </div>
            <div className="control">
                {suggestion.name}
            </div>
        </div>
    </a>
)

export const renderInputComponent = (inputProps, isLoading) => (
    <div className={classnames("control", { ["is-loading"]: isLoading })}>
        <input {...inputProps} className="input" maxLength="40" />
    </div>
)

export const renderSuggestionsContainer = ({ containerProps, children, query }, isLoading, inputFocused) => (
    <>
        <div {...containerProps} className={classnames("dropdown", { ["is-active"]: !!children })}>
            <div className="dropdown-menu">
                <div className="dropdown-content">
                    {children}
                </div>
            </div>
        </div>
        {!children && query && !isLoading && inputFocused &&
            <div className="dropdown is-active">
                <div className="dropdown-menu">
                    <div className="dropdown-content">
                        <div className="dropdown-item">
                            <p>There are no tags named "{query}"</p>
                        </div>
                    </div>
                </div>
            </div>
        }
    </>
)
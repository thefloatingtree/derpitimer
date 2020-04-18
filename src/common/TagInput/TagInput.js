import React, { useState, useEffect } from 'react'
import dinky from 'dinky.js'
import fuzzysort from 'fuzzysort'
import './TagInput.scss'

export default function TagInput() {
    const [predictions, setPredictions] = useState([])
    const [selectedPrediction, setSelectedPrediction] = useState({});
    const [query, setQuery] = useState("")
    const [tags, setTags] = useState([])

    const WaitInterval = 150;
    const NumPredictions = 5;

    useEffect(() => {
        if (!query) return setPredictions([]);
        const getPredictions = async () => {
            console.log("api calls")
            const newTags = (await dinky().tags().search(query.trim())).tags;
            const sortedTags = (await fuzzysort.goAsync(query, newTags, { key: 'name' })).map(item => item.obj)
            setPredictions(sortedTags)
            setSelectedPrediction(sortedTags[0])
        }
        const timer = setTimeout(getPredictions, WaitInterval)
        return () => clearTimeout(timer)
    }, [query])

    const onSelectPrediction = (item, event) => {
        event.preventDefault()
        if (!tags.some(item => item === query)) {
            setTags([...tags, item.name])
        }
        setQuery("")
    }

    const onInputKeyPress = event => {
        if (event.key !== "Enter") return;
        if (selectedPrediction && !tags.some(item => item === query)) {
            setTags([...tags, selectedPrediction.name])
            setQuery("")
        }
    }

    const onInputKeyDown = event => {
        if (event.keyCode === 38) { // Up arrow
            let currentIndex = predictions.findIndex(item => item.name === selectedPrediction.name)
            currentIndex = !currentIndex ? 0 : currentIndex - 1
            setSelectedPrediction(predictions[currentIndex])
        } else if (event.keyCode === 40) { // Down arrow
            let currentIndex = predictions.findIndex(item => item.name === selectedPrediction.name)
            currentIndex = currentIndex >= NumPredictions - 1 ? NumPredictions - 1 : currentIndex + 1
            setSelectedPrediction(predictions[currentIndex])
        }
    }

    const onRemoveTag = item => {
        setTags(tags.filter(i => i !== item))
    }

    const onQueryChange = event => {
        setQuery(event.target.value)
    }

    return (
        <div>
            <div className={predictions.length ? "dropdown is-active" : "dropdown"}>
                <div className="field has-addons">
                    <div className="control is-expanded">
                        <input
                            className="input"
                            type="text"
                            placeholder="Add a tag..."
                            value={query}
                            onChange={onQueryChange}
                            onKeyPress={onInputKeyPress}
                            onKeyDown={onInputKeyDown}
                        />
                    </div>
                    <div className="control">
                        <button className="button">Make Template</button>
                    </div>
                </div>
                <div className="dropdown-menu" role="menu">
                    <div className="dropdown-content">
                        {predictions.slice(0, NumPredictions).map((item, index) => {
                            return (
                                <a
                                    key={index}
                                    href="/"
                                    className={item.name === selectedPrediction?.name ? "dropdown-item is-active" : "dropdown-item"}
                                    onClick={onSelectPrediction.bind(this, item)}
                                >{item.name}</a>
                            )
                        })}
                    </div>
                </div>
            </div>
            <div className="tags are-medium">
                {tags.map((item, index) => {
                    return (
                        <span key={index} className="tag is-info">
                            {item}
                            <button onClick={onRemoveTag.bind(this, item)} className="delete is-small"></button>
                        </span>
                    )
                })}
            </div>
        </div>
    )
}
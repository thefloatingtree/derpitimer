import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import StackGrid from "react-stack-grid"
import ReactPlayer from 'react-player'

import DerpiURLFactory from '../../redux/factories/DerpiURLFactory'

function ImagePreview({ imagePreviews }) {
    const [grid, setGrid] = useState(null)
    const colWidth = 150

    // fix layout bugs when imagePreviews change
    useEffect(() => {
        if (grid) grid.updateLayout()
    }, [grid, imagePreviews])

    return (
        <StackGrid columnWidth={colWidth} gridRef={gridRef => setGrid(gridRef)} monitorImagesLoaded>
            {imagePreviews.map((image) => {
                return (
                    <a key={image.sha512_hash} href={DerpiURLFactory(image.id)} target="_blank">
                        {image.format === "webm" ?
                            // Have to use a separate way of displaying webms as img does not support it
                            <ReactPlayer
                                playing
                                loop
                                volume={0}
                                key={image.sha512_hash}
                                url={image.representations.thumb}
                                width='100%'
                                height='100%'
                            ></ReactPlayer>
                            :
                            <img src={image.representations.thumb} width={image.width} height={image.height} alt={image.source_url} />
                        }
                    </a>
                )
            })
            }
        </StackGrid >
    )
}

const mapStateToProps = (state) => ({
    imagePreviews: state.start.imagePreviews,
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(ImagePreview)

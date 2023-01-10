import { useState } from 'react'

function GalleryItem({ item }) {
    const [view, setView] = useState(false)

    const simpleStyle = {
        'width': '25vw',
        'height': '20vh',
        'border': '1px solid black',
        'margin': '2px'
    }

    const detailedStyle = {
        'width': '80vw',
        'height': '30vh',
        'border': '1px solid black',
        'margin': '2px',
        'backgroundImage': `url(${item.artworkUrl100})`,
        'backgroundRepeat': 'no-repeat',
        'backgroundSize': 'cover',
    }

    const simpleView = () => {
        return (
            <div style={simpleStyle}>
                <h3>{item.trackName}</h3>
                <h4>{item.collectionName}</h4>
            </div>
        )
    }

    const detailedView = () => {
        return (
            <div style={detailedStyle}>
                <h3>{item.trackName}</h3>
                <p>{item.collectionName}</p>
                <p>{item.primaryGenreName}</p>
                <p>{item.releaseDate}</p>
            </div>
        )
    }


    return (
        <div style={{ 'display': 'inline-block' }} onClick={() => setView(!view)}>
            {view ? detailedView() : simpleView()}
        </div>
    )
}

export default GalleryItem
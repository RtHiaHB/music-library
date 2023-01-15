import GalleryItem from "./GalleryItem"

function Gallery(props) {
    const data = props.data.result.read()
    const display = data.map((item, i) => {
        return (
            <GalleryItem key={i} item={item} />
        )
    })
    return (
        <div>
            {display}
        </div>
    )
}

export default Gallery
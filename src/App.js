import { useState, useEffect, Suspense } from 'react'
//Gallery
import Gallery from './Components/Gallery'
import Searchbar from './Components/Searchbar'
import { createResource as fetchData } from './helper'

function App() {
  const [search, setSearch] = useState('')
  const [message, setMessage] = useState('Search for Music!')
  const [data, setData] = useState(null)

  const handleSearch = (e, term) => {
    e.preventDefault()
    setSearch(term)
  }

  useEffect(() => {
    if(search) {
      setData(fetchData(search))
    }
  }, [search])

  const renderGallery = () => {
    if(data) {
      return (
        <Suspense fallback={<Spinner />}>
          <Gallery data={data} />
        </Suspense>
      )
    }
  }

  return (
    <div>
      <Searchbar handleSearch={handleSearch} />
      {message}
      {renderGallery()}
    </div>
  );
}

export default App;

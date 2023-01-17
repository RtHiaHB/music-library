import { useState, useEffect, Fragment, Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Gallery from './Components/Gallery'
import Searchbar from './Components/Searchbar'
import { createResource as fetchData } from './helper'
import { DataContext } from './Context/DataContext'
import AlbumView from './Components/AlbumView'
import ArtistView from './Components/ArtistView'

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
      console.log(search)
      const encodedSearchTerm = encodeURIComponent(search)
      const data = fetchData(encodedSearchTerm)
      console.log(data)
      // if(data.results.length > 0) {
      //   setData(data.results)
      // } else {
      //   setMessage('Results not Found')
      // }
    }
  }, [search])

  const renderGallery = () => {
    if(data) {
      return (
        <Suspense fallback={<h1>Loading...</h1>}>
          <Gallery data={data} />
        </Suspense>
      )
    }
  }

  return (
    <div>
      {message}
      <Router>
        <Routes>
          <Route path="/" element ={
            <Fragment>
              <Searchbar handleSearch={handleSearch} />
              <DataContext.Provider value={data}>
                {renderGallery()}
              </DataContext.Provider>
            </Fragment>
          } />
          <Route path="/album/:id" element={<AlbumView />} />
          <Route path="/artist/:id" element={<ArtistView />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

import './SearchBar.css'

const SearchBar = ({search, setSearch}) => {

  return (
    <div>
      <input className='searchBar' type='text' placeholder='Search...' value={search} onChange={(e) => setSearch(e.target.value)}/>
    </div>
  )
}

export default SearchBar

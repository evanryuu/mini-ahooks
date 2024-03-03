import { useEffect, useState } from 'react'
import { routes } from '.'
import { Link, Outlet } from 'react-router-dom'

export default function Root() {
  const [searchTerms, setSearchTerms] = useState('')
  const [filteredRoutes, setFilteredRoutes] = useState(routes[0].children)

  useEffect(() => {
    setFilteredRoutes(
      routes[0].children.filter((v) => v.path.toLocaleLowerCase().includes(searchTerms.toLocaleLowerCase()))
    )
  }, [searchTerms])
  return (
    <>
      <div id="sidebar">
        <h1>Mini Ahooks</h1>
        <div>
          <form id="search-form" className="flex items-center gap-4" role="search">
            <input
              id="q"
              aria-label="Search contacts"
              placeholder="Search"
              type="search"
              name="q"
              value={searchTerms}
              onChange={(e) => setSearchTerms(e.target.value.trim())}
            />
            <button className="rounded-md h-32px flex items-center justify-center">Github</button>
            <div className="sr-only" aria-live="polite"></div>
          </form>
        </div>
        <nav>
          <ul>
            {filteredRoutes.map((v) => (
              <li key={v.path}>
                <Link to={v.path}>{v.path.split('/')[1]}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div id="detail">
        <Outlet />
      </div>
    </>
  )
}

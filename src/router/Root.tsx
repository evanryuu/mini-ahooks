import { useEffect, useState } from 'react'
import { routes } from '.'
import { Link, Outlet, useLocation } from 'react-router-dom'

export default function Root() {
  const [searchTerms, setSearchTerms] = useState('')
  const [filteredRoutes, setFilteredRoutes] = useState(routes[0].children)
  const location = useLocation()

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
            <a
              href="https://github.com/evanryuu/mini-ahooks"
              target="_blank"
              className="rounded-lg bg-white border border-solid border-stone-300 hover:border-blue-300 hover:text-blue-300 transition-colors !underline-unset text-stone-500 py-2 px-4 flex items-center justify-center"
            >
              Github
            </a>
            <div className="sr-only" aria-live="polite"></div>
          </form>
        </div>
        <nav>
          <ul>
            {filteredRoutes.map((v) => (
              <li key={v.path} className={v.path === location.pathname.split('/')[2] ? 'text-blue-500' : ''}>
                <Link to={v.path}>{v.path}</Link>
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

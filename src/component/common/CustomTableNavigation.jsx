import getTextCurrentLocale from '../../utils/getTextCurrentLocale'
import myordersStyles from "../../styles/Myorders.module.css"

export default function CustomTableNavigation({ numPages, currentPage, setPage }) {
    const updatePage = (currentPage, action) => {
      if(0 < currentPage + action && currentPage + action <= numPages)
        setPage(currentPage + action)
    }
  
    const classPageNum = (page) => {
      if(page == currentPage)
        return myordersStyles.tablePaginationNumberCurrent
      else
        return myordersStyles.tablePaginationNumber
    }
  
    return(
      <nav className="ml-1">
        <ul className={myordersStyles.tablePaginationContainer}>
          <li>
            <button onClick={() => updatePage(currentPage, -1)} className={myordersStyles.tablePaginationPrevious}>{getTextCurrentLocale('previous')}</button>
          </li>
          {[...Array(numPages).keys()].map((page) => (
            <li key={page}>
              <button 
                onClick={() => setPage(page+1)} 
                className={classPageNum(page+1)}>{page+1}
              </button>
            </li>
          ))}
          <li>
            <button onClick={() => updatePage(currentPage, 1)} className={myordersStyles.tablePaginationNext}>{getTextCurrentLocale('next')}</button>
          </li>
        </ul>
      </nav>
    )
}
import React, { useEffect } from "react";




const TableFooter = ({ range, setPage, page, slice }) => {
  useEffect(() => {
    if (slice.length < 1 && page !== 1) {
      setPage(page - 1);
    }
  }, [slice, page, setPage]);

  function checkLimit(buttonType, page, range){
    
    let maxIndex = range.length;
    console.log(maxIndex);
    
    if(page != 1 && buttonType == "previous"){
        setPage(page - 1);
    }
    else if(page < maxIndex && buttonType == "next"){
        setPage(page +1);
    }

    console.log("currentPage "+page)
    
  }

  return (
    <div>
        <nav>
        <ul className="inline-flex -space-x-px">
            <li>
            <button onClick={() => checkLimit("previous",page,range)} className="px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Previous</button>
            </li>
            {range.map((el, index) => (
                <li>
                <button key={index} onClick={() => setPage(el)} className={`${page != el ? 'px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white' : 'z-10 px-3 py-2 leading-tight text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white'}`}>{el}</button>
                </li>                 
            ))}
            <li>
            <button onClick={() => checkLimit("next",page,range,setPage)} className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Next</button>
            </li>
        </ul>
        </nav>

    </div>
  );
};

export default TableFooter;
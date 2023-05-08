import Head from 'next/head'
import Layout from "../component/Layout"
import getTextCurrentLocale from '../utils/getTextCurrentLocale'

export default function Home() {
  return (
    <>
      <Head>
        <title>TransMedWebPTIN</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Layout>
          <div>
                  <div class="dark:bg-gray-800">
                      <div class="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
                          <div class="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
                          </div>
                          <div class="overflow-x-auto">
                              <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                  <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                      <tr>
                                          <th scope="col" class="px-4 py-3">{getTextCurrentLocale('medicine')}</th>
                                          <th scope="col" class="px-4 py-3">{getTextCurrentLocale('amount_in_storage')}</th>
                                          <th scope="col" class="px-4 py-3">{getTextCurrentLocale('amount_sold')}</th>
                                          <th scope="col" class="px-4 py-3">{getTextCurrentLocale('top_seller_city')}</th>
                                          <th scope="col" class="px-4 py-3"></th>
                                          <th scope="col" class="px-4 py-3">
                                              <span class="sr-only">{getTextCurrentLocale('actions')}</span>
                                          </th>
                                      </tr>
                                  </thead>
                                  <tbody>
                                      <tr class="border-b dark:border-gray-700">

                                          <th scope="row" class="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">Ibuprofeno 600mg</th>
                                          <td class="px-4 py-3"><p class="text-gray-900  py-1 rounded-lg w-min">125.258</p></td>
                                          <td class="px-4 py-3">891.187</td>
                                          <td class="px-24 py-3">D</td>

                                      </tr>
                                      <tr class="border-b dark:border-gray-700">

                                          <th scope="row" class="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">Ibuprofeno 600mg</th>
                                          <td class="px-4 py-3"><p class="bg-yellow-300 px-3 text-gray-900  py-1 rounded-lg w-min">567</p></td>
                                          <td class="px-4 py-3">915.071</td>
                                          <td class="px-24 py-3">I</td>

                                      </tr>
                                      <tr class="border-b dark:border-gray-700">
                                          <th scope="row" class="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">Ibuprofeno 600mg</th>
                                          <td class="px-4 py-3"><p class="text-gray-900  py-1 rounded-lg w-min">302.199</p></td>
                                          <td class="px-4 py-3">1.248.665</td>
                                          <td class="px-24 py-3">B</td>

                                      </tr>
                                      <tr class="border-b dark:border-gray-700">
                                          <th scope="row" class="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">Ibuprofeno 600mg</th>
                                          <td class="px-4 py-3"><p class="text-gray-900  py-1 rounded-lg w-min">105.680</p></td>
                                          <td class="px-4 py-3">1.076.802</td>
                                          <td class="px-24 py-3">M</td>

                                      </tr>
                                      <tr class="border-b dark:border-gray-700">
                                          <th scope="row" class="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">Ibuprofeno 600mg</th>
                                          <td class="px-4 py-3"><p class="text-gray-900  py-1 rounded-lg w-min">235.394</p></td>
                                          <td class="px-4 py-3">1.645.386</td>
                                          <td class="px-24 py-3">F</td>

                                      </tr>
                                      <tr class="border-b dark:border-gray-700">
                                          <th scope="row" class="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">Ibuprofeno 600mg</th>
                                          <td class="px-4 py-3"><p class="text-gray-900  py-1 rounded-lg w-min">32.682</p></td>
                                          <td class="px-4 py-3">220.915</td>
                                          <td class="px-24 py-3">X</td>

                                      </tr>
                                      <tr class="border-b dark:border-gray-700">
                                          <th scope="row" class="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">Ibuprofeno 600mg</th>
                                          <td class="px-4 py-3"><p class="bg-red-500 px-3 text-gray-900  py-1 rounded-lg w-min">{getTextCurrentLocale('sold_out')}</p></td>
                                          <td class="px-4 py-3">1.229.421</td>
                                          <td class="px-24 py-3">R</td>
                                          <td class="px-4 py-3"></td>
                                          <td class="px-1 py-3">
                                              <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                                  {getTextCurrentLocale("request")}
                                                  <svg aria-hidden="true" class="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                                              </button>
                                          </td>

                                      </tr>
                                      <tr class="border-b dark:border-gray-700">
                                          <th scope="row" class="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">Ibuprofeno 600mg</th>
                                          <td class="px-4 py-3"><p class="bg-red-500 px-3 text-gray-900  py-1 rounded-lg w-min">{getTextCurrentLocale('sold_out')}</p></td>
                                          <td class="px-4 py-3">1.221.690</td>
                                          <td class="px-24 py-3">T</td>
                                          <td class="px-4 py-3"></td>
                                          <td class="px-1 py-3">
                                              <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                                {getTextCurrentLocale("request")}
                                                  <svg aria-hidden="true" class="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                                              </button>
                                          </td>

                                      </tr>
                                      <tr class="border-b dark:border-gray-700">
                                          <th scope="row" class="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">Ibuprofeno 600mg</th>
                                          <td class="px-4 py-3"><p class="text-gray-900  py-1 rounded-lg w-min">144.226</p></td>
                                          <td class="px-4 py-3">145.572</td>
                                          <td class="px-24 py-3">U</td>

                                      </tr>
                                      <tr class="border-b dark:border-gray-700">
                                          <th scope="row" class="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">Ibuprofeno 600mg</th>
                                          <td class="px-4 py-3"><p class="text-gray-900  py-1 rounded-lg w-min">227.754</p></td>
                                          <td class="px-4 py-3">982.120</td>
                                          <td class="px-24 py-3">Ω</td>

                                      </tr>
                                      <tr class="border-b dark:border-gray-700">
                                          <th scope="row" class="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">Ibuprofeno 600mg</th>
                                          <td class="px-4 py-3"><p class="bg-yellow-300 px-3 text-gray-900  py-1 rounded-lg w-min">200</p></td>
                                          <td class="px-4 py-3">125.761</td>
                                          <td class="px-24 py-3">Θ</td>


                                      </tr>
                                      <tr class="border-b dark:border-gray-700">
                                          <th scope="row" class="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">Ibuprofeno 600mg</th>
                                          <td class="px-4 py-3"><p class="text-gray-900  py-1 rounded-lg w-min">230.424</p></td>
                                          <td class="px-4 py-3">1.690.392</td>
                                          <td class="px-24 py-3">Θ</td>

                                      </tr>
                                      <tr class="border-b dark:border-gray-700">
                                          <th scope="row" class="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">Ibuprofeno 600mg</th>
                                          <td class="px-4 py-3"><p class="text-gray-900  py-1 rounded-lg w-min">201.645</p></td>
                                          <td class="px-4 py-3">68.470</td>
                                          <td class="px-24 py-3">H</td>

                                      </tr>
                                      <tr class="border-b dark:border-gray-700">
                                          <th scope="row" class="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">Ibuprofeno 600mg</th>
                                          <td class="px-4 py-3"><p class="bg-red-300 px-3 text-gray-900  py-1 rounded-lg w-min">30</p></td>
                                          <td class="px-4 py-3">191.640</td>
                                          <td class="px-24 py-3">Z</td>

                                      </tr>
                                      <tr class="border-b dark:border-gray-700">
                                          <th scope="row" class="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">Ibuprofeno 600mg</th>
                                          <td class="px-4 py-3"><p class="text-gray-900  py-1 rounded-lg w-min">109.028</p></td>
                                          <td class="px-4 py-3">1.450</td>
                                          <td class="px-24 py-3">Ψ</td>

                                      </tr>
                                  </tbody>
                              </table>
                          </div>
                          <nav class="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4" aria-label="Table navigation">
                              <span class="text-sm font-normal text-gray-500 dark:text-gray-400">
                                  Showing
                                  <span class="font-semibold text-gray-900 dark:text-white"> 1-15 </span>
                                  of
                                  <span class="font-semibold text-gray-900 dark:text-white"> 1000</span>
                              </span>
                              <ul class="inline-flex items-stretch -space-x-px">
                                  <li>
                                      <a href="#" class="flex items-center justify-center h-full py-1.5 px-3 ml-0 text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                          <span class="sr-only">Previous</span>
                                          <svg class="w-5 h-5" aria-hidden="true" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                              <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
                                          </svg>
                                      </a>
                                  </li>
                                  <li>
                                      <a href="#" class="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">1</a>
                                  </li>
                                  <li>
                                      <a href="#" class="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">2</a>
                                  </li>
                                  <li>
                                      <a href="#" aria-current="page" class="flex items-center justify-center text-sm z-10 py-2 px-3 leading-tight text-primary-600 bg-primary-50 border border-primary-300 hover:bg-primary-100 hover:text-primary-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white">3</a>
                                  </li>
                                  <li>
                                      <a href="#" class="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">...</a>
                                  </li>
                                  <li>
                                      <a href="#" class="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">100</a>
                                  </li>
                                  <li>
                                      <a href="#" class="flex items-center justify-center h-full py-1.5 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                          <span class="sr-only">{getTextCurrentLocale('next')}</span>
                                          <svg class="w-5 h-5" aria-hidden="true" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                              <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                                          </svg>
                                      </a>
                                  </li>
                              </ul>
                          </nav>
                      </div>
                  </div>
              </div>
        </Layout>
      </main>
    </>
  )
}


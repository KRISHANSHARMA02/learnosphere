'use client';
import Navbar from '@/components/Navbar';
import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Banner from '@/public/Banner.jpeg';
import Link from 'next/link';
import FormSection from '@/components/FormGeneral';

const DataTable = () => {
  const [classLevel, setClassLevel] = useState(null);
  const router = useRouter();
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const searchParams = new URLSearchParams(window.location.search);
      setClassLevel(searchParams.get('classLevel'));
    }
  }, []);

  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://learnospherebackend.learnosphere.in/api/route/formulapage');
        setData(response.data);
      } catch (err) {
        console.error('Error Fetching Data:', err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="text-gray-600">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <>
      <Navbar />
      <div className='bg-gray-100'>
        <div className='px-4 md:px-28 flex flex-col md:flex-row gap-6 bg-gray-100 container mx-auto pt-24'>
          <div className='flex flex-col gap-5 w-full md:w-[65%]'>
            {data.length > 0 ? (
              data.map((item) => (
                <div key={item.id} className="mb-4">
                  <h1 className="mb-2 p-4 text-white text-[1.4em] bg-orange-600 font-bold">{item.heading1}</h1>
                  <Link href="https://sarvgyat.learnosphere.in/">
                    <Image className='mt-3' src={Banner} alt="" />
                  </Link>
                  <p className="mb-2 mt-6">{item.para1}</p>

                  <h1 className="mb-2 text-slate-800 text-[1.4em]">{item.heading2}</h1>
                  <p className="mb-5">{item.para2}</p>

                  <div className='border border-black rounded-xl'>
                    <h1 className="mb-2 text-slate-800 text-[1.4em]">{item.heading3}</h1>
                    {item.list1 && item.list1.length > 0 && (
                      <ol className="list-disc text-orange-600 pl-5 mb-2">
                        {item.list1.map((listItem, index) => (
                          <li key={index} className="mb-1">{listItem}</li>
                        ))}
                      </ol>
                    )}
                  </div>
                  <p className="mb-5 mt-2">{item.para3}</p>

                  <div className="grid gap-4">
                    <h1 className="text-slate-800 text-[1.4em]">{item.heading4}</h1>
                    {(item.tableData && item.tableData.length > 0) || (item.anotherField && item.anotherField.length > 0) ? (
                      <table className='min-w-full bg-white border border-gray-300'>
                        <tbody>
                          <tr>
                            {item.tableData && item.tableData.length > 0 ? (
                              <td className="border border-slate-800">
                                {item.tableData.map((dataItem, index) => (
                                  <div
                                    key={index}
                                    className={`py-2 px-4 ${index === item.tableData.length - 1 ? '' : 'border-b border-slate-800'} hover:bg-gray-100`}
                                  >
                                    {dataItem}
                                  </div>
                                ))}
                              </td>
                            ) : (
                              <td className="border border-slate-800">
                                <div className="py-2 px-4 text-gray-500">No data found</div>
                              </td>
                            )}

                            {item.anotherField && item.anotherField.length > 0 && (
                              <td className="border border-slate-800">
                                {item.anotherField.map((dataItem, index) => (
                                  <div
                                    key={index}
                                    className={`py-2 px-4 ${index === item.anotherField.length - 1 ? '' : 'border-b border-slate-800'} hover:bg-gray-100`}
                                  >
                                    {dataItem}
                                  </div>
                                ))}
                              </td>
                            )}
                          </tr>
                        </tbody>
                      </table>
                    ) : null}
                  </div>

                  <p className=" mt-2">{item.para4}</p>
                  <p className="mt-2">{item.para5}</p>
                  <p className="mt-2">{item.para6}</p>

                  <h1 className="mb-2 text-slate-800 text-[1.4em]">{item.heading7}</h1>
                  <div key={item.id} className="mb-4">
                  {/* Displaying each list separately */}
                  
                  {item.list2.length > 0 && ( // Check if list1 has items
                      <div>
                      
                          <ol className="list-disc text-orange-600 pl-5 mb-2">
                              {item.list2.map((listItem, index) => (
                                  <li key={index} className="mb-1">
                                      <Link href='/SubjectFormula?classLevel=6'>
                                          {listItem} {/* Display the current list item */}
                                      </Link>
                                  </li>
                              ))}
                          </ol>
                      </div>
                  )}
                  {item.list4.length > 0 && ( // Check if list1 has items
                      <div>
                      
                          <ol className="list-disc text-orange-600 pl-5 mb-2">
                              {item.list4.map((listItem, index) => (
                                  <li key={index} className="mb-1">
                                      <Link href='/SubjectFormula?classLevel=7'>
                                          {listItem} {/* Display the current list item */}
                                      </Link>
                                  </li>
                              ))}
                          </ol>
                      </div>
                  )}
                  {item.list5.length > 0 && ( // Check if list1 has items
                      <div>
                      
                          <ol className="list-disc text-orange-600 pl-5 mb-2">
                              {item.list5.map((listItem, index) => (
                                  <li key={index} className="mb-1">
                                      <Link href='/SubjectFormula?classLevel=8'>
                                          {listItem} {/* Display the current list item */}
                                      </Link>
                                  </li>
                              ))}
                          </ol>
                      </div>
                  )}
                  {item.list6.length > 0 && ( // Check if list1 has items
                      <div>
                      
                          <ol className="list-disc text-orange-600 pl-5 mb-2">
                              {item.list6.map((listItem, index) => (
                                  <li key={index} className="mb-1">
                                      <Link href='/SubjectFormula?classLevel=9'>
                                          {listItem} {/* Display the current list item */}
                                      </Link>
                                  </li>
                              ))}
                          </ol>
                      </div>
                  )}
                  {item.list7.length > 0 && ( // Check if list1 has items
                      <div>
                      
                          <ol className="list-disc text-orange-600 pl-5 mb-2">
                              {item.list7.map((listItem, index) => (
                                  <li key={index} className="mb-1">
                                      <Link href='/SubjectFormula?classLevel=10'>
                                          {listItem} {/* Display the current list item */}
                                      </Link>
                                  </li>
                              ))}
                          </ol>
                      </div>
                  )}
                  {item.list8.length > 0 && ( // Check if list1 has items
                      <div>
                      
                          <ol className="list-disc text-orange-600 pl-5 mb-2">
                              {item.list8.map((listItem, index) => (
                                  <li key={index} className="mb-1">
                                      <Link href='/SubjectFormula?classLevel=11'>
                                          {listItem} {/* Display the current list item */}
                                      </Link>
                                  </li>
                              ))}
                          </ol>
                      </div>
                  )}
                  {item.list9.length > 0 && ( // Check if list1 has items
                      <div>
                      
                          <ol className="list-disc text-orange-600 pl-5 mb-2">
                              {item.list9.map((listItem, index) => (
                                  <li key={index} className="mb-1">
                                      <Link href='/SubjectFormula?classLevel=12'>
                                          {listItem} {/* Display the current list item */}
                                      </Link>
                                  </li>
                              ))}
                          </ol>
                      </div>
                  )}
          
                
              </div>

                  <p className="">{item.para7}</p>

                  {item.imageUrls && item.imageUrls.length > 0 && (
                    <div className="flex gap-4 mt-4">
                      {item.imageUrls.map((imageUrl, index) => (
                        <Image 
                          key={index} 
                          src={imageUrl} 
                          alt={`Image ${index + 1}`}
                          width={1000}
                          height={1000} 
                          className="w-full h-auto rounded-lg"
                        />
                      ))}
                    </div>
                  )}
                  {item.imageUrls1 && item.imageUrls1.length > 0 && (
                    <div className="flex gap-4 mt-4">
                      {item.imageUrls1.map((imageUrl, index) => (
                        <Image 
                          key={index} 
                          src={imageUrl} 
                          alt={`Image ${index + 1}`}
                          width={1000}
                          height={1000} 
                          className="w-full h-auto rounded-lg"
                        />
                      ))}
                    </div>
                  )}
                  {item.imageUrls2 && item.imageUrls2.length > 0 && (
                    <div className="flex gap-4 mt-4">
                      {item.imageUrls2.map((imageUrl, index) => (
                        <Image 
                          key={index} 
                          src={imageUrl} 
                          alt={`Image ${index + 1}`}
                          width={1500}
                          height={1500} 
                          className="w-full h-auto rounded-lg"
                        />
                      ))}
                    </div>
                  )}

                  <h1 className="mb-1 text-slate-800 text-[1.4em]">{item.heading13}</h1>
                  <p className="mb-5">{item.para13}</p>
                  <h1 className="mb-1 text-slate-800 text-[1.4em]">{item.heading14}</h1>
                  <p className="mb-5">{item.para14}</p>
                  <h1 className="mb-1 text-slate-800 text-[1.4em]">{item.heading15}</h1>
                  <p className="mb-5">{item.para15}</p>
                  <h1 className="mb-1 text-slate-800 text-[1.4em]">{item.heading16}</h1>
                  <p className="mb-5">{item.para16}</p>
                  <h1 className="mb-1 text-slate-800 text-[1.4em]">{item.heading17}</h1>
                  <p className="mb-5">{item.para17}</p>
                  <h1 className="mb-1 text-slate-800 text-[1.4em]">{item.heading18}</h1>
                  <p className="mb-5">{item.para18}</p>

                  <div className='flex flex-col text-[.8em] mt-5 border border-slate-800  rounded-lg p-1'>
                  <h1 className=' font-semibold'>{item.heading6}</h1>
                                      
                  {item.list3 && item.list3.length > 0 && (
                    <ol className="  flex flex-wrap gap-2 w-full p-4 text-orange-600  mb-2">
                    {item.list3.map((listItem, index) => (
                      <li key={index} className="mb-1 w-[48%] p-4 bg-gray-200 rounded-lg font-semibold hover:bg-orange-600 hover:text-white hover:font-bold transition-all ease-in-out duration-150">{listItem}</li>
                      ))}
                      </ol>
                      )}
                      </div>
                </div>
              ))
            ) : (
              <p>No data available</p>
            )}
          </div>
          <div className=''>
            <FormSection />
          </div>
        </div>
      </div>
    </>
  );
};

export default DataTable;

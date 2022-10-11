import React from 'react'
import { useState } from 'react'
import { AsyncPaginate } from 'react-select-async-paginate'
import { Geo_Api_Url, options } from '../../api'

export const Search = ({ onSearchChange }) => {
      const [search, setSearch] = useState(null);

      const loadOptions = (inputValue) => {
            return fetch(`${Geo_Api_Url}/cities?minPopulation=1000000&namePrefix=${inputValue}`, options)
                  .then(response => response.json())
                  .then(response => {
                        return {
                              options: response.data.map((city) =>{
                                    return {
                                          value:`${city.latitude} ${city.longitude}`,
                                          label:`${city.name}, ${city.countryCode}`
                                    }
                              })
                        }
                  })
                  .catch(err => console.error(err));
      }

      const handleChange = (searchData) => {
            setSearch(searchData);
            onSearchChange(searchData);
      }

      return (
            <AsyncPaginate
                  placeholder="Search For City"
                  debounceTimeout={600}
                  value={search}
                  onChange={handleChange}
                  loadOptions={loadOptions}
            />

      )
}

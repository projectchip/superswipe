import React, { FormEvent, useEffect, useRef, useState } from 'react';
import styles from '../styles/filterBar.module.css';
import SelectComponent from './SelectComponent';
import { CssTextField } from './CustomButton';
import { Chip } from '@mui/material';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { useDataAndFilterContext } from '../context/DataContext';
import getCategories from '../pages/api/getCategories';
import getIndustries from '../pages/api/getIndustries';


const FilterComponent = () => {
    const [categroyLabels, setCategoryLabels] = useState([]);
    const [industryLables, setIndustryLables] = useState([]);
    const [search, setSearch] = useState('');
    const {
        query,
        setQueryString,
        setFilterCategory,
        setFilterIndustry
    } = useDataAndFilterContext();

    const handleFilterCategory = (category: Array<any>) => {
        setFilterCategory(category);
    }

    const handleFilterIndustry = (industry: Array<any>) => {
        setFilterIndustry(industry);
    }

    const clearFilters = () => {
        setFilterCategory([]);
        setFilterIndustry([]);
        setQueryString('');
        setSearch('');
    }

    let inputTimer: any;

    return (
        <>
        <div className={styles.filterBar}>
            <div className={styles.clearFilters}>
                <a href='#' id='clear-filter-btn'
                    className={styles.clearButton} onClick={clearFilters}>
                    <div style={{color: '#160042'}}>
                        Clear Filters
                    </div>
                    <FilterAltIcon/>
                </a>
            </div>
            <div className={styles.filterSearch}>
                <div className={styles.searchIcon}>
                    <CssTextField
                        type='text' 
                        className={styles.searchField}
                        name='searchField'
                        label='Search'
                        placeholder='Search...'
                        id='search-field'
                        value={search}
                        onBlur={(e) => {
                            clearTimeout(inputTimer);
                            setQueryString(e.target.value);
                        }}
                        onKeyDown={() => {
                            clearTimeout(inputTimer)
                        }}
                        onChange={(e) => {
                            setSearch(e.target.value);
                            inputTimer = setTimeout(() => {
                                setQueryString(e.target.value);
                            }, 3000)
                        }}
                    />
                </div>
            </div>
            <div className={styles.filterSearch}>
                <SelectComponent title={'Category'} setterFunction={handleFilterCategory} labels={'getCategories'} />
            </div>
            <div className={styles.filterSearch}>
                <SelectComponent title={'Industry'} setterFunction={handleFilterIndustry} labels={'getIndustries'} />
            </div>
        </div>
        </>
    )
}


export default FilterComponent;
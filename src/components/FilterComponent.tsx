import React, { FormEvent, useEffect, useRef, useState } from 'react';
import styles from '../styles/filterBar.module.css';
import SelectComponent from './SelectComponent';
import { CssTextField } from './CustomButton';
import { Chip } from '@mui/material';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { useDataAndFilterContext } from '../context/DataContext';


const FilterComponent = () => {
    const {
        query,
        filterCategroy,
        filterIndustry,
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
    }

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
                        value={query}
                        onChange={(e) => {
                            setQueryString(e.target.value);
                        }}
                    />
                </div>
            </div>
            <div className={styles.filterSearch}>
                <SelectComponent title={'Category'} setterFunction={handleFilterCategory} preChecked={[]}/>
            </div>
            <div className={styles.filterSearch}>
                <SelectComponent title={'Industry'} setterFunction={handleFilterIndustry} preChecked={[]}/>
            </div>
        </div>
        {/* <div>
                {query}
                {filterCategroy.length}
                {filterIndustry}
        </div> */}
        </>
    )
}


export default FilterComponent;
import React, {useState} from "react";
import styles from '../styles/mainData.module.css';
import DataCard from "./DataCard";
import FilterComponent from "./FilterComponent";
import { useDataAndFilterContext } from "../context/DataContext";
import Chip from '@mui/material/Chip';

const MainData = () => {
    const {data, filterCategroy, filterIndustry} = useDataAndFilterContext();

    return (
        <div className={styles.mainDiv}>
            <div className={styles.mainCard}>
                <FilterComponent />
                <div style={{
                    width: '100%', display: 'flex',
                    flexDirection: 'row',
                    marginTop: '-15px',
                    flexWrap:'wrap', marginBottom: '30px',
                }}>
                    <div>
                        {
                            typeof filterCategroy == 'object' ?
                            filterCategroy.map((category: string) => {
                                return (<Chip className={styles.filterChip} label={category} key={category} variant="outlined" />)
                            }) : null
                        }
                    </div>
                    <div>
                        {
                            typeof filterIndustry == 'object' ?
                            filterIndustry.map((industry: string) => {
                                return (<Chip className={styles.filterChip} label={industry} key={industry} variant="outlined" />)
                            }) : null
                        }
                    </div>
                </div>
                <div className={styles.dataContainer}>
                    <DataCard />
                    <DataCard />
                    <DataCard />
                    <DataCard />
                    <DataCard />
                    <DataCard />
                    <DataCard />
                    <DataCard />
                    <DataCard />
                    <DataCard />
                    <DataCard />
                    <DataCard />
                    <DataCard />
                    <DataCard />
                </div>
            </div>
        </div>
    )
}

export default MainData;
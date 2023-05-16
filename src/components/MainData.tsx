import React, {useState, useEffect} from "react";
import styles from '../styles/mainData.module.css';
import DataCard from "./DataCard";
import FilterComponent from "./FilterComponent";
import { useDataAndFilterContext } from "../context/DataContext";
import Chip from '@mui/material/Chip';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

const MainData = () => {
    const controller = new AbortController();
    const {query, filterCategroy, filterIndustry} = useDataAndFilterContext();
    const [totalPages, setTotalPages] = useState(1);
    const [offset, setOffset] = useState(1);
    const [listings, setListings] = useState([]);
    const [loading, setLoading] = useState(true);
    let requestSent = false;

    useEffect(()=>{

        

        document.title = 'Home';
        getSearchResult(1);
    }, [query, filterCategroy, filterIndustry])

    useEffect(()=>{}, [offset, totalPages]);

    const getSearchResult = async (offset: number) => {
        setLoading(true);
        let newData: any = [];
        const startAt = (offset - 1) * 5;
        controller.abort();
            if (!requestSent) {
                requestSent = true;
                const response = await sendRequest(offset);
                const result: any = await response.json();
                newData = [...newData, ...result.data];
                setListings(newData);
                setLoading(false);
                setTotalPages(result.total);
                requestSent = false;
        }
    };

    const sendRequest = async (i: number) => {
        return await fetch(`/api/getData`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept-Encoding': 'gzip',
            },
            body: JSON.stringify({ query, offset: i, filterCategroy, filterIndustry }),
          });
    }

    const handlePageOffset = (event: any, page: number) => {
        getSearchResult(page);
    };

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
                    {
                        loading ?
                        <Box sx={{display: 'flex', flexGrow: 1, justifyContent: 'center'}}>
                            <CircularProgress />
                        </Box>
                        :
                        <div className={styles.dataContainer}>
                            {
                                listings.length > 0 ?
                                listings.map((item: any) => {
                                    return (
                                        <DataCard key={item._id} data={item}/>
                                    )
                                })
                                :
                                <h1 style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    position: 'absolute',
                                    width: '100%',
                                }}>No Record Found</h1>
                            }
                        </div>
                    }
                </div>
            <div style={{flexGrow: 1, alignItems: 'center',
                justifyContent: 'center', display: 'flex',
                margin: '20px',
            }}>
                <Stack spacing={2}>
                    <Pagination
                        count={totalPages}
                        color="primary"
                        size='medium'
                        disabled={loading || listings.length == 0}
                        onChange={handlePageOffset}
                    />
                </Stack>
            </div>
        </div>
    )
}

export default MainData;
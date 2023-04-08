import { createContext, ReactElement, useReducer, useCallback, useContext } from "react";

type StateType = {
    data: Array<string>,
    query: string | Array<string>,
    filterCategroy: Array<string> | string,
    filterIndustry: Array<string> | string,
}

type ReducerAction = {
    type: REDUCER_ACTION_TYPE,
    payload: string | Array<string>,
}

export const initState: StateType = {data: [], query: "", filterCategroy: [], filterIndustry: []};

const enum REDUCER_ACTION_TYPE {
    REQUSTDATA,
    SETQUERYSTRING,
    SETFILTERCATEGORY,
    SETFILTERINDUSTRY,
    CLEARFILTERS,
}

const reducer = (state: StateType, action: ReducerAction): StateType => {
    switch (action.type) {
        case REDUCER_ACTION_TYPE.REQUSTDATA:
            return initState;
        case REDUCER_ACTION_TYPE.SETQUERYSTRING:
            return {...state, query: action.payload};
        case REDUCER_ACTION_TYPE.SETFILTERCATEGORY:
            return {...state, filterCategroy: action.payload};
        case REDUCER_ACTION_TYPE.SETFILTERINDUSTRY:
            return {...state, filterIndustry: action.payload};
        case REDUCER_ACTION_TYPE.CLEARFILTERS:
            return {data: [], query: "", filterCategroy: [], filterIndustry: []}
        default:
            throw new Error()
    }
}


const useDataContext = (initState: StateType) => {
    const [state, dispatch] = useReducer(reducer, initState);

    const requestDataUpdate = useCallback(() => {
        //TODO
        //THIS WILL MAKE REQUEST TO DB TO GET DATA>>>
    }, [])

    const setQueryString = useCallback((searchString: string) => {
        dispatch({
            type: REDUCER_ACTION_TYPE.SETQUERYSTRING,
            payload: searchString
        })
    }, [])

    const setFilterCategory = useCallback((category: Array<string>) => {
        dispatch({
            type: REDUCER_ACTION_TYPE.SETFILTERCATEGORY,
            payload: category
        })
    }, [])

    const setFilterIndustry = useCallback((industry: Array<string>) => {
        dispatch({
            type: REDUCER_ACTION_TYPE.SETFILTERINDUSTRY,
            payload: industry
        })
    }, [])

    const clearFilters = useCallback(()=> {
        //TODO
    }, [])

    return {state, requestDataUpdate, setQueryString, setFilterCategory, setFilterIndustry, clearFilters}
}


type UseDataContextType = ReturnType<typeof useDataContext>

const initContextState: UseDataContextType = {
    state: initState,
    requestDataUpdate: () => {return []},
    setQueryString: ()=> {return ""},
    setFilterCategory: ()=> {return []},
    setFilterIndustry: ()=> {return []},
    clearFilters: ()=> {return null}
}

export const DataContext = createContext<UseDataContextType>(initContextState)

export const DataProvider = ({ children }: {children?: ReactElement | undefined}): ReactElement => {
    return(
        <DataContext.Provider value={useDataContext(initState)}>
            {children}
        </DataContext.Provider>
    )
}

export const useDataAndFilterContext = () => {
    const {
        state: {data, query, filterCategroy, filterIndustry},
        requestDataUpdate,
        setQueryString,
        setFilterCategory,
        setFilterIndustry} = useContext(DataContext);
    return {
        data,
        query,
        filterCategroy,
        filterIndustry,
        requestDataUpdate,
        setQueryString,
        setFilterCategory,
        setFilterIndustry};
}
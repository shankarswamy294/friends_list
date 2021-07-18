import React from 'react';
import { PAGE_SIZE } from '../../contants';

const Pagination = ({activePage, data, paginationClickHandler}) =>{

    const getPaginationArr = (totalCount) => {
        return [...Array(totalCount < PAGE_SIZE ? 1 : Math.ceil(totalCount / PAGE_SIZE)).keys()];
    }

    return (
        <div class="pagination">
            {activePage !==1 && <a href="/#" onClick={(e)=>{e.preventDefault(); paginationClickHandler(activePage-1)}}>&laquo;</a>}
            {getPaginationArr(data.length).map((page, key)=>{
                return <a href="/#" key={key} style={activePage===(page+1)?{color: "blue"}:null} onClick={(e)=>{e.preventDefault(); paginationClickHandler(page+1)}}>{page+1}</a>
            })}
            {activePage!==getPaginationArr(data.length).length && <a href="/#" onClick={(e)=>{e.preventDefault(); paginationClickHandler(activePage+1)}}>&raquo;</a>}
        </div>
    )
}

export default Pagination;
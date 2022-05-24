import React, { useRef } from 'react';

function ProjectDetailHeader() {
    const inputSearch = useRef(null);
    function toggleShow() {
        inputSearch.current.classList.toggle('show');
    }
    return (
        <>
            <div className="searchContainer">
                <input
                    ref={inputSearch}
                    type="text"
                    id="box"
                    placeholder="Search anything..."
                    className="search__box"
                />
                <i
                    className="fas fa-search search__icon"
                    id="icon"
                    onclick={toggleShow}
                />
            </div>
        </>
    );
}

export default ProjectDetailHeader;

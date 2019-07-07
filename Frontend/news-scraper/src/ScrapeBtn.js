import React from 'react';

const ScrapeBtn = (props) => {
    return (
    <button onClick={() => props.clicky()}>Scrape New Articles</button>
    )
};

export default ScrapeBtn;
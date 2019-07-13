import React from 'react';
import ("./CSS/ScrapeBtn.css");

const ScrapeBtn = (props) => {
    return (
    <div className="scrapeBtn">
    <button onClick={() => props.clicky()}>Scrape New Articles</button>
    </div>
    )
};

export default ScrapeBtn;
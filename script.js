'use strict';
const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const quoteAuthor = document.getElementById('author');
const newQuoteBtn = document.getElementById('new-quote');
const twitterBtn = document.getElementById('twitter');
const loader = document.getElementById('loader');

const timeoutSec = 10;
const apiUrl = 'https://type.fit/api/quotes';

// Show loader remove quote container
const loading = function () {
    loader.hidden = false;
    quoteContainer.hidden = true;
    console.log('loading');
};
// Hide loader show quote container
const complete = function () {
    loader.hidden = true;
    quoteContainer.hidden = false;
    console.log('complete');
};

// Timeout function
const timeout = function (s) {
    return new Promise(function (_, reject) {
        setTimeout(function () {
            reject(new Error(`Request took too long! Timeout after ${s} second`));
        }, s * 1000);
    });
};

let data = [];


const publishQuote = function () {
    const numberOfQuotes = data.length;
    const randomPosition = Math.floor(Math.random() * numberOfQuotes);
    const { text, author } = data[randomPosition];
    console.log(data);


    // Check for long quote
    text.length > 120 ? quoteText.classList.add('long-quote') : quoteText.classList.remove('long-quote');

    // Dom manipulation of quote and author
    quoteText.textContent = text;
    author ? quoteAuthor.textContent = author : quoteAuthor.textContent = 'Unknown';
};
// Get Quotes from API
const AJAX = async function (url = apiUrl) {
    try {
        loading();
        const fetchPro = fetch(url);
        const res = await Promise.race([fetchPro, timeout(timeoutSec)]);
        data = await res.json();

        if (!res.ok) throw new Error(`${data.status}${data.message}${data}`);

        publishQuote();
        complete();


        return data;
    } catch (err) {
        throw err;
    }
};


// On load run AJAX async function
AJAX();

// Tweet quote
const tweetQuote = function () {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${quoteAuthor.textContent}`;
    window.open(twitterUrl, '_blank');

};

// Event listeners for new quote and twitter buttons
newQuoteBtn.addEventListener('click', publishQuote);
twitterBtn.addEventListener('click', tweetQuote);

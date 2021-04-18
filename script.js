"use strict";
const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const aboutBtn = document.getElementById("about");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");
let apiQoutes = [];

function openSpinningloader() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}
function closeSpinningloader() {
  loader.hidden = true;
  quoteContainer.hidden = false;
}

// Show new Quote
function newQuote() {
  openSpinningloader();
  // Pick a random quote from apiQuotes object

  const quote = apiQoutes[Math.floor(Math.random() * apiQoutes.length)];

  // Check if Author field is blank and replace it with "Unknown"

  if (!quote.author) {
    authorText.textContent = "Unknown";
  } else {
    authorText.textContent = quote.author;
  }

  // Check if quote is bigger or not

  if (quote.text.length > 50) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }

  quoteText.textContent = quote.text;
  closeSpinningloader();
}

// Get Quotes From API
async function getQuote() {
  openSpinningloader();
  const apiUrl = "https://type.fit/api/quotes";
  try {
    const response = await fetch(apiUrl);
    apiQoutes = await response.json();
    newQuote();
  } catch (error) {
    //   Catch Error here
    console.log("Whooops, no qoutes!!!", error);
  }
}

// Tweet qoute
function tweetQoute() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} -${authorText.textContent}`;
  window.open(twitterUrl, "_blank");
}

// About Button
function aboutMe() {
  const aboutUrl = "about.html";
  window.open(aboutUrl, "_blank");
}

// Event Listners
newQuoteBtn.addEventListener("click", newQuote);
twitterBtn.addEventListener("click", tweetQoute);
aboutBtn.addEventListener("click", aboutMe);
// On load on start
getQuote();

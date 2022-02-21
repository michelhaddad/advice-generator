const setDiceActive = (active) => {
    document.getElementById('dice-circle').onclick = active ? updateQuote : null;
}

const toggleDiceRotation = () => {
    document.getElementById('dice-circle').classList.toggle('infinite-rotation');
}

let count = 0;
let quotes = []

const getQuotesArray = async () => {
    let response = await fetch("https://type.fit/api/quotes");
    response = await response.json();
    return response.map(q => q.text);
}

const updateQuote = async () => {
    setDiceActive(false)
    toggleDiceRotation()

    if (quotes.length === 0) quotes = await getQuotesArray();

    const text = quotes[count]
    count = (count + 1) % quotes.length;

    const quoteEl = document.getElementById('quote')
    quoteEl.classList.add('fading-text')

    setTimeout(() => {
        quoteEl.innerText = text;
    }, 1000)
    setTimeout(() => {
        quoteEl.classList.remove('fading-text')
        toggleDiceRotation()
        setDiceActive(true)
    }, 2000)
}
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
    return shuffle(response.map(q => q.text));
}

const updateQuote = async () => {
    setDiceActive(false)
    toggleDiceRotation()

    if (quotes.length === 0) quotes = await getQuotesArray();

    const text = quotes[count]
    count = (count + 1) % quotes.length;

    const quoteEl = document.getElementById('quote')
    const adviceIdEl = document.getElementById('advice')
    quoteEl.classList.add('fading-text')
    adviceIdEl.classList.add('fading-text')

    setTimeout(() => {
        quoteEl.innerText = text;
        adviceIdEl.innerText = `ADVICE #${Math.ceil(Math.random() * 1000)}`
    }, 1000)
    setTimeout(() => {
        quoteEl.classList.remove('fading-text')
        adviceIdEl.classList.remove('fading-text')
        toggleDiceRotation()
        setDiceActive(true)
    }, 2000)
}

const shuffle = (array) => {
    let currentIndex = array.length,  randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {

        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
}
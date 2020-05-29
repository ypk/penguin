const APIPort = 3000;
const APIBaseUrl = `http://localhost:${APIPort}`;
const APIEndpoint = `${APIBaseUrl}/api`;

const getData = async () => {
    let apiData = await fetch(APIEndpoint);
    return apiData;
};

const getError = (node = undefined, reason) => {
    if(node){
        node.classList.add("error");
    }

    return `
    <header>
        <h2>Uh Oh!</h2>
    </header>
    <p>There seems to be a problem with ${reason}</p>
    <p>Please refresh the page and try again</p>`;    
};

const sanitizeData = (str) => {
    if(typeof str === "undefined") str = "";
    let newString = new String(str);
    return newString.toString();
};

const generateAltText = (name, author) => {
    const title = typeof name === "undefined" ? "Unknown Title": sanitizeData(name);
    const authorName = typeof author === "undefined" ? "Unknown Author" : sanitizeData(author);
    return `${title} by ${authorName}`;
};

export {
    APIBaseUrl,
    generateAltText,
    getData,
    getError,
    sanitizeData
};
import "../styles/main.scss";

{
    const APIPort = 3000;
    const APIBaseUrl = `http://localhost:${APIPort}`;
    const APIEndpoint = `${APIBaseUrl}/api`;
    const collectionNode = document.querySelector(".collection");
    const loaderNode = document.querySelector(".loader");

    const getData = async () => {
        let apiData = await fetch(APIEndpoint);
        return apiData.json();
    };

    const getError = (reason) => {
        collectionNode.classList.add("error");
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

    const renderUI = () => {

        getData().then((data) => {

            if(Object.keys(data).length === 0) {
                let errorNode = getError("data");
                console.error(errorNode);
                collectionNode.insertAdjacentHTML("beforeend", errorNode);
                loaderNode.remove();
                return;
            }

            collectionNode.classList.remove("error");

            data.forEach((item) => {
                let { author, image, title, url } = item;
                
                let altText = generateAltText(title, author);
                let imageUrl = `${APIBaseUrl}/${image}`;
                let productLink = sanitizeData(url);
                let productTitle = sanitizeData(title);
                let authorName = sanitizeData(author);

                let product = `<div class="product">
                    <a class="product__link" href="${productLink}">
                        <img rel="preload" defer class="product__image" alt="${altText}" src="${imageUrl}">
                        <div class="product__details">
                            <p class="product__name">${productTitle}</p>
                            ${authorName !== "" ? `<p class="product__author">${authorName}</p>` : ''} 
                        </div>
                    </a>
                </div>`;
                collectionNode.insertAdjacentHTML("beforeend", product);
            })

            loaderNode.remove();

        })
        .catch((error) => {
            console.error(error);
            const errorNode = getError("Internet");
            collectionNode.insertAdjacentHTML("beforeend", errorNode);
            loaderNode.remove();
        });
    }
    renderUI();


    const registerServiceWorker = () => { 
        if (navigator.serviceWorker) {
            navigator.serviceWorker.register('./serviceWorker.js')
                .then((registration) => console.info('ServiceWorker registration successful with scope:',  registration.scope))
                .catch((error) => console.error('ServiceWorker registration failed:', error));
        }
    }

    window.addEventListener('load', (e) => {
        registerServiceWorker();
    });
}

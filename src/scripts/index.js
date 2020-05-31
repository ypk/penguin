import  { APIBaseUrl, generateAltText, getData, getError, sanitizeData } from "./utils";
import "../styles/main.scss";

{
    const collectionNode = document.querySelector(".collection");
    const loaderNode = document.querySelector(".loader");

    const renderUI = () => {

        getData()
            .then((response) => response.json())
            .then((data) => {
                let productContainer = document.createElement("ul");
                productContainer.classList.add("product-container");

                if(Object.keys(data).length === 0) {
                    let errorNode = getError(collectionNode, "data");
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

                    let product = `<li class="product">
                        <a class="product__link" href="${productLink}" title="${altText}">
                            <img rel="preload" defer class="product__image" alt="${altText}" src="${imageUrl}">
                            <div class="product__details">
                                <p class="product__name">${productTitle}</p>
                                ${authorName !== "" ? `<p class="product__author">${authorName}</p>` : ''} 
                            </div>
                        </a>
                    </li>`;
                    productContainer.insertAdjacentHTML("beforeend", product);
                });
                collectionNode.appendChild(productContainer);
                loaderNode.remove();
            })
            .catch((error) => {
                console.error(error);
                const errorNode = getError(collectionNode, "Internet");
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

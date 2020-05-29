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
        return `<h2>Uh Oh!</h2>
        <p>There seems to be a problem with ${reason}</p>
        <p>Please refresh the page and try again</p>`;    
    }

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
                let product = `<div class="product">
                    <a class="product__link" href="${url}">
                        <img defer class="product__image" src="${APIBaseUrl}/${image}">
                        <div class="product__details">
                            <p class="product__name">${title}</p>
                            ${typeof author !== "undefined" ? `<p class="product__author">${author}</p>` : ''} 
                        </div>
                    </a>
                </div>`;
                collectionNode.insertAdjacentHTML("beforeend", product);
            })
            loaderNode.remove();
        })
        .catch((error) => {
            console.error(error);
            const errorNode = getError("data");
            collectionNode.insertAdjacentHTML("beforeend", errorNode);
            loaderNode.remove();
        });
    }
    renderUI();
}

import "../styles/main.scss";

{
    const APIBaseUrl = "http://localhost:3000";
    const APIEndpoint = `${APIBaseUrl}/api`;
    const collectionNode = document.querySelector(".collection");
    const loaderNode = document.querySelector(".loader");

    const getData = async () => {
        let apiData = await fetch(APIEndpoint);
        return apiData.json();
    };

    const renderUI = () => {
        getData().then((data) => {
            if(Object.keys(data).length === 0) {

            }

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
        });
    }
    renderUI();
}

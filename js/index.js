const navContainer = document.getElementById('nav-container');
const newsContainer = document.getElementById('news-container');
const loadCategory = async() => {
    const response = await fetch('https://openapi.programming-hero.com/api/news/categories');
    const data = await response.json();
    data.data.news_category.forEach((item) => {
        const div = document.createElement('div');
        div.innerHTML = `<button onclick = "loadNews('${item.category_id}')" class="btn btn-ghost">${item.category_name}</button>`;
        navContainer.appendChild(div);
    })
}


const loadNews = async(catId) => {
    document.getElementById("loading-spiner").classList.remove('hidden');
    const response = await fetch(`https://openapi.programming-hero.com/api/news/category/${catId}`);
    const data = await response.json();
    newsContainer.innerHTML = '';
    data.data.forEach((item) => {
        document.getElementById("loading-spiner").classList.add('hidden');
        const div = document.createElement('div');
        div.innerHTML = `
        <div class="hero bg-base-200 rounded-xl">
            <div class="hero-content flex-col lg:flex-row">
            <img src="${item.thumbnail_url}" class="max-w-sm rounded-lg shadow-2xl" />
            <div>
            <div class="flex justify-between">
                <h5 class="text-xl font-bold">${item.title}</h5>
            <div>
                <p class="news-badge">${item.rating.badge}<sup><h6 class="news-rating">${item.rating.number}</h6></sup></p>
            </div>
            </div>
            <div class = " ">
                <p class="mt-5">${item.details.slice(0,200)}</p>
               <div>
                    <div class = "flex justify-between">
                        <div class="flex gap-2 items-center">
                            <div>
                                <img class="w-16 h-16 rounded-full" src="${item.author.img}" alt="">
                            </div>
                            <div>
                            <h5>${item.author.name}</h5>
                            <h5>${item.author.published_date}</h5>
                            </div>
                        </div>
                        <button class="btn btn-primary">Details</button>
                    </div>

                </div>
            </div>
            </div>
            </div>
        </div>
        `;
        newsContainer.appendChild(div);
    })
}

const handleSearch = () => {
    const value = document.getElementById('search-box').value;
    if(value){
        loadNews(value)
    }
    else{
        alert("Please enter avalid catID")
    }
}

loadCategory()
loadNews("08")
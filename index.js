const trandingCard = document.getElementById('top-rated-card');
const loading = document.getElementById('loading');

const detailsContainer = document.getElementById('details-container');
const modal = document.getElementById('my_modal_5');


async function loadTopRatedProducts() {
    try {
        const response = await fetch('https://fakestoreapi.com/products');
        if (!response.ok) throw new Error('Failed to fetch products');

        const products = await response.json();

        const topRated = products
            .sort((a, b) => b.rating.rate - a.rating.rate)
            .slice(0, 3);

        loading.remove();

        topRated.forEach(product => {
            const card = document.createElement('div');
            card.className = `
                group bg-white rounded-xl shadow-md overflow-hidden 
                hover:shadow-xl transition-all duration-300 hover:-translate-y-2 
                border border-gray-100 flex flex-col
            `;

            card.innerHTML = `
                <div class="h-56 md:h-64 p-6 bg-gray-50 flex items-center justify-center overflow-hidden">
                    <img 
                        src="${product.image}" 
                        alt="${product.title}" 
                        class="max-h-full w-auto object-contain transition-transform duration-500"
                        loading="lazy"
                    >
                </div>
                <div class="p-5 md:p-6 flex flex-col gap-3 flex-grow">
                    <div class="flex justify-between items-center">
                        <span class="badge badge-outline badge-primary text-xs md:text-sm px-3 py-1">
                            ${product.category}
                        </span>
                        <p class="text-yellow-500 font-medium text-sm md:text-base">
                            ★★★★★ <span class="text-gray-500">
                                ${product.rating.rate.toFixed(1)} (${product.rating.count})
                            </span>
                        </p>
                    </div>
                    <h3 class="text-lg md:text-xl font-semibold text-gray-800 line-clamp-2 min-h-[3rem]">
                        ${product.title}
                    </h3>
                    <p class="text-2xl font-bold text-orange-600">
                        $${product.price.toFixed(2)}
                    </p>
                    <div class="flex gap-4 mt-4">
                        <button 
                            class="details-btn flex-1 py-3 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-700 transition-colors duration-200"
                            data-id="${product.id}"
                        >
                            <i class="fa-solid fa-eye mr-2"></i> Details
                        </button>
                        <button 
                            class="flex-1 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200"
                        >
                            <i class="fa-solid fa-cart-plus mr-2"></i> Add to Cart
                        </button>
                    </div>
                </div>
            `;

            trandingCard.appendChild(card);
        });

    } catch (error) {
        console.error('Error:', error);
        loading.innerHTML = `
            <p class="text-red-600 font-medium text-center py-8">
                Sorry, could not load products. Please try again later.
            </p>
        `;
    }
}

async function showProductDetails(productId) {
    try {
        detailsContainer.innerHTML = `
            <div class="flex justify-center py-6">
                <span class="loading loading-spinner loading-lg text-primary"></span>
            </div>
        `;
        modal.showModal();

        const response = await fetch(`https://fakestoreapi.com/products/${productId}`);
        if (!response.ok) throw new Error('Product not found');
        const product = await response.json();

        detailsContainer.innerHTML = `
            <div class="">
                <div class="space-y-4">
                    <h2 class="text-2xl md:text-3xl font-bold text-gray-800">
                        ${product.title}
                    </h2>
                    <div class="flex items-center gap-3">
                        <span class="badge badge-outline badge-primary px-3 py-1">
                            ${product.category}
                        </span>
                        <div class="text-yellow-500 font-medium">
                            ★★★★★ ${product.rating.rate.toFixed(1)} 
                            <span class="text-gray-500 text-sm">(${product.rating.count} reviews)</span>
                        </div>
                    </div>

                    <p class="text-4xl font-bold text-orange-600">
                        $${product.price.toFixed(2)}
                    </p>

                    <p class="text-gray-700 leading-relaxed">
                        ${product.description}
                    </p>

                    <div class="pt-4">
                        <button class="btn btn-primary w-full md:w-auto px-10">
                            <i class="fa-solid fa-cart-plus mr-2"></i> Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        `;

    } catch (error) {
        console.error(error);
        detailsContainer.innerHTML = `
            <div class="alert alert-error">
                <span>Failed to load product details. Please try again.</span>
            </div>
        `;
    }
}

trandingCard.addEventListener('click', function (details) {
    const btn = details.target.closest('.details-btn');
    if (!btn) return;

    const productId = btn.dataset.id;
    if (productId) {
        showProductDetails(productId);
    }
});

// Page Load
loadTopRatedProducts();

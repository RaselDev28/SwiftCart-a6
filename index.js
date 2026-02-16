// Tranding Card........

const grid = document.getElementById('top-rated-card');
const loading = document.getElementById('loading');

async function loadTopRatedProducts() {
    try {
        const response = await fetch('https://fakestoreapi.com/products');

        if (!response.ok) {
            throw new Error('Failed to fetch products');
        }

        const products = await response.json();

        // Sort by rating take top 3
        const topRated = products
            .sort((a, b) => b.rating.rate - a.rating.rate)
            .slice(0, 3);

        // Clear loading message
        loading.remove();

        // Create cards
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
           <div class="flex justify-between">
            <span class="rounded btn btn-primary w-35">${product.category}</span>
            <p class="text-yellow-500 font-medium">
                ★★★★★ <span class="text-gray-500 text-sm">
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
              <div class="flex justify-between gap-5">
                 <button class="mt-auto w-full py-3 bg-gray-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200">
                <i class="fa-solid fa-eye"></i> Details
              </button>
              <button class="mt-auto w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200">
                Add to Cart
              </button>
              </div>
            </div>
          `;

            grid.appendChild(card);
        });

    } catch (error) {
        console.error('Error loading products:', error);
        loading.innerHTML = `
          <p class="text-red-600 font-medium">
            Sorry, could not load products right now. Please try again later.
          </p>
        `;
    }
}

// Run when page loads
window.addEventListener('DOMContentLoaded', loadTopRatedProducts);
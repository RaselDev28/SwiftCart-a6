const loadCategories = () => {
    fetch('https://fakestoreapi.com/products/categories')
        .then(res => res.json())
        .then(categories => displayCategories(categories))
        .catch(err => console.error("Categories load error:", err));
};

const displayCategories = (categories) => {
    const container = document.getElementById('category-container');
    container.innerHTML = '';

    categories.forEach(cat => {
        const btn = document.createElement('button');
        btn.className = 'btn px-6 py-3 bg-white border-2 border-blue-500 text-blue-600 rounded-full hover:bg-blue-600 hover:text-white transition font-medium';
        btn.textContent = cat.charAt(0).toUpperCase() + cat.slice(1);
        btn.onclick = () => loadProductsByCategory(cat);
        container.appendChild(btn);
    });
};

// Load Products by Category
const loadProductsByCategory = (category) => {
    const url = category === 'all'
        ? 'https://fakestoreapi.com/products'
        : `https://fakestoreapi.com/products/category/${encodeURIComponent(category)}`;

    fetch(url)
        .then(res => res.json())
        .then(products => displayProducts(products))
        .catch(err => console.error("Products load error:", err));
};

const displayProducts = (products) => {
    const container = document.getElementById('product-container');
    container.innerHTML = '';

    if (products.length === 0) {
        container.innerHTML = '<p class="col-span-full text-center text-xl text-gray-500 py-10">No products found in this category.</p>';
        return;
    }

    products.forEach(product => {
        const card = document.createElement('div');
        card.className = 'bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition transform hover:-translate-y-1';

        // title
        const shortTitle = product.title.length > 60
            ? product.title.substring(0, 57) + '...'
            : product.title;

        // Star rating
        const stars = '★'.repeat(Math.round(product.rating.rate)) + '☆'.repeat(5 - Math.round(product.rating.rate));

        card.innerHTML = `
          <img src="${product.image}" alt="${product.title}" class="w-full h-64 object-contain p-6 bg-white">
          <div class="p-5">
            <h3 class="font-bold text-lg mb-2 h-14 overflow-hidden">${shortTitle}</h3>
            <p class="text-2xl font-semibold text-green-600 mb-2">$${product.price.toFixed(2)}</p>
            
            <div class="flex justify-between items-center mb-4">
              <span class="inline-block px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                ${product.category}
              </span>
              <div class="flex items-center">
                <span class="text-yellow-500 mr-1">${stars}</span>
                <span class="text-gray-500 text-sm">(${product.rating.rate})</span>
              </div>
            </div>

            <div class="flex gap-3">
              <button onclick="showProductDetails(${product.id})" 
                class="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
                Details
              </button>
              <button class="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700">
                Add to Cart
              </button>
            </div>
          </div>
        `;

        container.appendChild(card);
    });
};

// Modal with full details
const showProductDetails = (id) => {
    fetch(`https://fakestoreapi.com/products/${id}`)
        .then(res => res.json())
        .then(product => {
            // console.log(product)
            document.getElementById('modal-image').src = product.image;
            document.getElementById('modal-title').textContent = product.title;
            document.getElementById('modal-price').textContent = product.price.toFixed(2);

            const starsDiv = document.getElementById('modal-stars');
            starsDiv.innerHTML = '★'.repeat(Math.round(product.rating.rate)).split('').map(s => `<i class="fas fa-star"></i>`).join('') +
                '☆'.repeat(5 - Math.round(product.rating.rate)).split('').map(s => `<i class="far fa-star"></i>`).join('');

            document.getElementById('modal-rating').textContent = `${product.rating.rate} (${product.rating.count} reviews)`;
            document.getElementById('modal-description').textContent = product.description;

            document.getElementById('product-modal').classList.remove('hidden');
        })
        .catch(err => console.error("Product details error:", err));
};

// Modal
document.getElementById('close-modal').onclick = () => {
    document.getElementById('product-modal').classList.add('hidden');
};

// Click outside modal to close
document.getElementById('product-modal').onclick = (e) => {
    if (e.target === document.getElementById('product-modal')) {
        document.getElementById('product-modal').classList.add('hidden');
    }
};


loadCategories();
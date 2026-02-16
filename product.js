const loadCatagory = () => {
    const url = "https://fakestoreapi.com/products/categories";
    fetch(url)
        .then(res => res.json())
        .then(data => {
            displayCatagory(data);
        })
        .catch(err => console.error("Error fetching categories:", err));
};

const displayCatagory = (categories) => {
    const catagoryContainer = document.getElementById("Catagory-container");
    if (!catagoryContainer) {
        console.error("Catagory-container not found");
        return;
    }

    catagoryContainer.innerHTML = "";

    categories.forEach(category => {
        const btnDiv = document.createElement("div");

        const button = document.createElement("button");
        button.className = "btn btn-outline btn-primary lesson-btn";
        button.innerHTML = `${category}`;
        
        button.addEventListener("click", () => loadLevelWord(category));

        btnDiv.appendChild(button);
        catagoryContainer.appendChild(btnDiv);
    });
};

loadCatagory();
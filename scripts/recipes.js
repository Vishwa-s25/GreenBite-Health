// Moderate Recipes Page JavaScript

// Recipe data
const recipes = [
    {
        id: 1,
        title: "Quinoa Buddha Bowl",
        description: "A nutritious and colorful bowl packed with protein, fiber, and essential vitamins. Perfect for a healthy lunch.",
        category: "lunch",
        difficulty: "Easy",
        time: "25 min",
        servings: "2 servings",
        icon: "fas fa-utensils",
        image: "Images/images (4).jpeg", // Set by user
        imageAlt: "Quinoa Buddha Bowl with colorful vegetables",
        ingredients: [
            "1 cup quinoa",
            "1 sweet potato, cubed",
            "1 cup chickpeas",
            "2 cups kale",
            "1 avocado",
            "1/4 cup pumpkin seeds",
            "2 tbsp olive oil",
            "1 lemon",
            "Salt and pepper to taste"
        ],
        instructions: [
            "Cook quinoa according to package instructions and let cool",
            "Roast sweet potato cubes with olive oil at 400°F for 20 minutes",
            "Drain and rinse chickpeas, season with salt and pepper",
            "Massage kale with olive oil and lemon juice",
            "Assemble bowl with quinoa base, vegetables, and toppings",
            "Drizzle with olive oil and lemon juice before serving"
        ]
    },
    {
        id: 2,
        title: "Green Smoothie Bowl",
        description: "A refreshing and energizing breakfast bowl loaded with superfoods and antioxidants.",
        category: "breakfast",
        difficulty: "Easy",
        time: "10 min",
        servings: "1 serving",
        icon: "fas fa-apple-alt",
        image: "Images/images (5).jpeg",
        imageAlt: "Green smoothie bowl with fresh fruits and toppings",
        ingredients: [
            "2 cups spinach",
            "1 frozen banana",
            "1/2 cup frozen mango",
            "1/2 cup almond milk",
            "1 tbsp chia seeds",
            "1 tbsp almond butter",
            "Toppings: granola, berries, coconut flakes"
        ],
        instructions: [
            "Blend spinach, frozen banana, mango, and almond milk until smooth",
            "Add chia seeds and almond butter, blend briefly",
            "Pour into a bowl and let thicken for 2-3 minutes",
            "Top with granola, fresh berries, and coconut flakes",
            "Serve immediately while cold and refreshing"
        ]
    },
    {
        id: 3,
        title: "Baked Salmon",
        description: "Flaky salmon fillet with Mediterranean herbs and vegetables, baked to perfection.",
        category: "dinner",
        difficulty: "Medium",
        time: "30 min",
        servings: "2 servings",
        icon: "fas fa-fish",
        image: "Images/Baked-Salmon-main.jpg",
        imageAlt: "Baked salmon with Mediterranean vegetables",
        ingredients: [
            "2 salmon fillets (6 oz each)",
            "1 cup cherry tomatoes",
            "1/2 cup kalamata olives",
            "1/4 cup feta cheese",
            "2 tbsp olive oil",
            "1 lemon",
            "2 cloves garlic, minced",
            "1 tsp dried oregano",
            "Salt and pepper to taste"
        ],
        instructions: [
            "Preheat oven to 400°F and line a baking sheet with foil",
            "Place salmon fillets on the baking sheet",
            "Scatter tomatoes, olives, and garlic around the salmon",
            "Drizzle with olive oil and lemon juice",
            "Sprinkle with oregano, salt, and pepper",
            "Bake for 20-25 minutes until salmon flakes easily",
            "Top with crumbled feta cheese before serving"
        ]
    },
    {
        id: 4,
        title: "Chocolate Energy Balls",
        description: "No-bake energy balls perfect for pre-workout fuel or healthy dessert.",
        category: "snacks",
        difficulty: "Easy",
        time: "15 min",
        servings: "12 balls",
        icon: "fas fa-cookie-bite",
        image: "Images/Rite-Bites.jpg",
        imageAlt: "Chocolate energy balls with coconut coating",
        ingredients: [
            "1 cup dates, pitted",
            "1/2 cup almonds",
            "1/4 cup cocoa powder",
            "2 tbsp chia seeds",
            "2 tbsp maple syrup",
            "1 tsp vanilla extract",
            "1/4 cup shredded coconut"
        ],
        instructions: [
            "Soak dates in warm water for 10 minutes to soften",
            "Process almonds in a food processor until finely chopped",
            "Add dates, cocoa powder, chia seeds, and vanilla",
            "Process until mixture forms a sticky dough",
            "Roll into 12 small balls",
            "Roll in shredded coconut and refrigerate for 30 minutes"
        ]
    },
    {
        id: 5,
        title: "Cauliflower Rice Stir-Fry",
        description: "A low-carb alternative to traditional rice with colorful vegetables and Asian flavors.",
        category: "dinner",
        difficulty: "Easy",
        time: "20 min",
        servings: "3 servings",
        icon: "fas fa-seedling",
        image: "Images/images (6).jpeg",
        imageAlt: "Cauliflower rice stir-fry with colorful vegetables",
        ingredients: [
            "1 head cauliflower, riced",
            "2 cups mixed vegetables",
            "2 tbsp coconut oil",
            "2 cloves garlic, minced",
            "1 tbsp ginger, grated",
            "3 tbsp soy sauce",
            "1 tbsp sesame oil",
            "2 green onions, sliced",
            "1 tbsp sesame seeds"
        ],
        instructions: [
            "Pulse cauliflower in a food processor until rice-like consistency",
            "Heat coconut oil in a large wok or skillet",
            "Stir-fry garlic and ginger for 30 seconds",
            "Add vegetables and stir-fry for 3-4 minutes",
            "Add cauliflower rice and stir-fry for 5-6 minutes",
            "Season with soy sauce and sesame oil",
            "Garnish with green onions and sesame seeds"
        ]
    },
    {
        id: 6,
        title: "Overnight Oats",
        description: "A make-ahead breakfast that's creamy, nutritious, and endlessly customizable.",
        category: "breakfast",
        difficulty: "Easy",
        time: "5 min + overnight",
        servings: "1 serving",
        icon: "fas fa-bread-slice",
        image: "Images/images (7).jpeg",
        imageAlt: "Overnight oats with berries and nuts",
        ingredients: [
            "1/2 cup rolled oats",
            "1/2 cup almond milk",
            "1 tbsp chia seeds",
            "1 tbsp honey",
            "1/4 tsp vanilla extract",
            "1/4 cup mixed berries",
            "1 tbsp chopped nuts",
            "1 tbsp coconut flakes"
        ],
        instructions: [
            "Combine oats, almond milk, chia seeds, honey, and vanilla in a jar",
            "Stir well and refrigerate overnight (or at least 4 hours)",
            "In the morning, stir to combine and add more milk if needed",
            "Top with fresh berries, nuts, and coconut flakes",
            "Enjoy cold or warm in the microwave for 1 minute"
        ]
    }
];

// DOM elements
let filteredRecipes = [...recipes];
let recipesGrid, searchInput, filterButtons, modal, closeBtn;

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    // Initialize DOM elements
    recipesGrid = document.getElementById('recipes-grid');
    searchInput = document.getElementById('recipe-search');
    filterButtons = document.querySelectorAll('.filter-btn');
    modal = document.getElementById('recipe-modal');
    closeBtn = document.querySelector('.close-btn');
    
    displayRecipes(recipes);
    setupEventListeners();
});

// Setup event listeners
function setupEventListeners() {
    // Search functionality
    searchInput.addEventListener('input', filterRecipes);
    
    // Filter buttons
    filterButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            // Filter recipes
            filterRecipes();
        });
    });
    
    // Modal functionality
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal();
            }
        });
    }
    
    // Mobile menu
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }
}

// Display recipes
function displayRecipes(recipesToShow) {
    recipesGrid.innerHTML = recipesToShow.map(recipe => `
        <div class="recipe-card" onclick="openRecipeModal(${recipe.id})">
            <div class="recipe-image">
                ${recipe.image ? 
                    `<img src="${recipe.image}" alt="${recipe.imageAlt || recipe.title}">` : 
                    `<div class="image-placeholder"><i class="${recipe.icon}"></i></div>`
                }
            </div>
            <div class="recipe-content">
                <h3>${recipe.title}</h3>
                <p>${recipe.description}</p>
                <div class="recipe-meta">
                    <div class="recipe-stats">
                        <span><i class="fas fa-clock"></i> ${recipe.time}</span>
                        <span><i class="fas fa-users"></i> ${recipe.servings}</span>
                        <span><i class="fas fa-signal"></i> ${recipe.difficulty}</span>
                    </div>
                    <div class="recipe-category">${recipe.category}</div>
                </div>
                <div class="recipe-actions">
                    <button class="btn-recipe primary">View Recipe</button>
                </div>
            </div>
        </div>
    `).join('');
}

// Filter recipes
function filterRecipes() {
    const searchTerm = searchInput.value.toLowerCase();
    const activeFilter = document.querySelector('.filter-btn.active');
    const selectedCategory = activeFilter ? activeFilter.dataset.category : 'all';
    
    filteredRecipes = recipes.filter(recipe => {
        const matchesSearch = recipe.title.toLowerCase().includes(searchTerm) ||
                            recipe.description.toLowerCase().includes(searchTerm);
        const matchesCategory = selectedCategory === 'all' || recipe.category === selectedCategory;
        
        return matchesSearch && matchesCategory;
    });
    
    displayRecipes(filteredRecipes);
}

// Open recipe modal
function openRecipeModal(recipeId) {
    const recipe = recipes.find(r => r.id === recipeId);
    if (!recipe) return;
    
    // Populate modal content
    const modalImageContainer = document.querySelector('.recipe-image-large');
    if (recipe.image) {
        modalImageContainer.innerHTML = `<img src="${recipe.image}" alt="${recipe.imageAlt || recipe.title}">`;
    } else {
        modalImageContainer.innerHTML = `<div class="image-placeholder"><i class="${recipe.icon}"></i></div>`;
    }
    
    document.getElementById('modal-title').textContent = recipe.title;
    document.getElementById('modal-description').textContent = recipe.description;
    document.getElementById('modal-time').textContent = recipe.time;
    document.getElementById('modal-servings').textContent = recipe.servings;
    document.getElementById('modal-difficulty').textContent = recipe.difficulty;
    
    // Populate ingredients
    const ingredientsList = document.getElementById('modal-ingredients');
    ingredientsList.innerHTML = recipe.ingredients.map(ingredient => 
        `<li>${ingredient}</li>`
    ).join('');
    
    // Populate instructions
    const instructionsList = document.getElementById('modal-instructions');
    instructionsList.innerHTML = recipe.instructions.map(instruction => 
        `<li>${instruction}</li>`
    ).join('');
    
    // Show modal
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Close modal
function closeModal() {
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Keyboard navigation
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modal && modal.style.display === 'block') {
        closeModal();
    }
});

// Image upload functionality (for development/admin use)
function setupImageUpload() {
    const fileInputs = document.querySelectorAll('input[type="file"][data-recipe]');
    
    fileInputs.forEach(input => {
        input.addEventListener('change', function(e) {
            const file = e.target.files[0];
            const recipeId = input.dataset.recipe;
            
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    const imageUrl = e.target.result;
                    const preview = document.querySelector(`.image-preview[data-recipe="${recipeId}"]`);
                    
                    // Update preview
                    preview.innerHTML = `<img src="${imageUrl}" alt="Recipe preview">`;
                    preview.classList.add('has-image');
                    
                    // Update recipe data
                    const recipeIndex = getRecipeIndexBySlug(recipeId);
                    if (recipeIndex !== -1) {
                        recipes[recipeIndex].image = imageUrl;
                        displayRecipes(filteredRecipes);
                    }
                };
                reader.readAsDataURL(file);
            }
        });
    });
}

// Helper function to get recipe index by slug
function getRecipeIndexBySlug(slug) {
    const slugMap = {
        'quinoa-bowl': 0,
        'green-smoothie': 1,
        'baked-salmon': 2,
        'energy-balls': 3,
        'cauliflower-rice': 4,
        'overnight-oats': 5
    };
    return slugMap[slug] || -1;
}

// Function to show/hide image upload section (for admin use)
function toggleImageUpload() {
    const uploadSection = document.querySelector('.image-upload-section');
    uploadSection.style.display = uploadSection.style.display === 'none' ? 'block' : 'none';
    
    if (uploadSection.style.display === 'block') {
        setupImageUpload();
    }
}

// Add keyboard shortcut to toggle image upload (Ctrl + I)
document.addEventListener('keydown', function(e) {
    if (e.ctrlKey && e.key === 'i') {
        e.preventDefault();
        toggleImageUpload();
    }
});

// Global function for close button (backup)
window.closeModal = closeModal;
// Toggle Blog Post Summaries
const toggleSummaryBtns = document.querySelectorAll('.toggle-summary-btn');

toggleSummaryBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        const summary = e.target.previousElementSibling;
        summary.classList.toggle('hidden');
    });
});
// script.js

// Fetch and display blog posts
async function loadBlogPosts() {
    try {
        const response = await fetch('posts.json');
        const posts = await response.json();
        const blogPostsContainer = document.getElementById('blog-posts');

        posts.forEach(post => {
            const postElement = document.createElement('div');
            postElement.classList.add('blog-post');

            postElement.innerHTML = `
                <h3 class="post-title">${post.title}</h3>
                <img src="${post.image}" alt="${post.title}" class="post-image">
                <p class="post-summary">${post.summary}</p>
            `;

            blogPostsContainer.appendChild(postElement);
        });
    } catch (error) {
        console.error('Error loading blog posts:', error);
    }
}

// Call the function to load posts
loadBlogPosts();
// script.js

// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

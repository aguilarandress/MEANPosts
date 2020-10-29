async function getAllPosts() {
  // Get posts
  const response = await fetch('/api/posts');
  const posts = await response.json();
  console.log(posts);
}

// Setup event listeners
function loadEventListeners() {
  document.addEventListener('DOMContentLoaded', getAllPosts);
}

loadEventListeners();

async function getAllPosts() {
  try {
    // Get posts
    const response = await fetch('http://localhost:5000/api/posts');
    const posts = await response.json();
    posts.forEach((post) => {
      let postItem = document.createElement('li');
      postItem.innerText = post.title;
      document.querySelector('.posts').appendChild(postItem);
    });
  } catch (err) {
    console.error(err);
  }
}

// Setup event listeners
function loadEventListeners() {
  document.addEventListener('DOMContentLoaded', getAllPosts);
}

loadEventListeners();

const API_URL = "https://dummyjson.com/posts";
const blogContainer = document.getElementById("mini-blog");
const searchBar = document.getElementById("search-bar");
const searchButton = document.getElementById("search-button");

async function fetchBlogs() {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    renderBlogs(data.posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    blogContainer.innerHTML = "<p>Failed to load posts. Please try again later.</p>";
  }
}

function renderBlogs(posts) {
  blogContainer.innerHTML = ""; 
  posts.forEach((blog) => {
    const blogCard = document.createElement("div");
    blogCard.classList.add("blog-card");
    blogCard.innerHTML = `
      <h2 class="blog-title">${blog.title}</h2>
      <p class="blog-body">${blog.body}</p>
      <p><strong>Tags:</strong> ${blog.tags.join(", ")}</p>
    `;
    blogContainer.appendChild(blogCard);
  });
}

function filterBlogs() {
  const searchText = searchBar.value.toLowerCase();
  const blogCards = document.querySelectorAll(".blog-card");
  blogCards.forEach((card) => {
    const title = card.querySelector(".blog-title").textContent.toLowerCase();
    const body = card.querySelector(".blog-body").textContent.toLowerCase();
    card.style.display =
      title.includes(searchText) || body.includes(searchText) ? "" : "none";
  });
}

searchBar.addEventListener("input", filterBlogs);
searchButton.addEventListener("click", filterBlogs);

fetchBlogs();

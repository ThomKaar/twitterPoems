import fetch from 'node-fetch';

async function fetchHotPosts(subreddit) {
  try {
    const response = await fetch(`https://www.reddit.com/r/${subreddit}/hot.json?limit=1`);
    const data = await response.json();
    
    if (!data || !data.data || !data.data.children) {
      throw new Error("Failed to fetch posts from Reddit.");
    }
    
    const posts = data.data.children.map(post => {
      const { title, url, preview: { images } } = post.data;
      const [{ source: { url: imageUrl }}] = images;
      return { title, url, imageUrl };
    });
    return posts;
  } catch (error) {
    console.error("Error fetching hot posts:", error);
    return null;
  }
}

// Example usage:
fetchHotPosts("EarthPorn")
  .then(posts => {
    if (posts) {
      console.log("Hot posts from /r/javascript:");
      posts.forEach(post => {
        console.log(`Title: ${post.title}`);
        console.log(`URL: ${post.url}`);
        console.log(`Permalink: https://www.reddit.com${post.permalink}`);
        console.log("-----------------------");
      });
    } else {
      console.log("Failed to fetch hot posts.");
    }
  })
  .catch(err => console.error(err));

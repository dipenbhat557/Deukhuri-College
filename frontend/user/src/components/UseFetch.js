import { useEffect, useState } from "react";
import axios from "axios";

export default function useFetch(url) {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function loadData() {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          return;
        }

        const posts = await response.json();

        // Map over the posts and add the image URL for each notice
        const postsWithImages = await Promise.all(
          posts.map(async (post) => {
            if (post._links && post._links["wp:attachment"]) {
              // Assuming there is only one attachment, you may need to handle multiple attachments differently
              const mediaLink =
                post._links["wp:attachment"] &&
                post._links["wp:attachment"][0]?.href;

              const imageUrl = await getImageUrl(mediaLink);
              return { ...post, imageUrl: imageUrl };
            }
            return post;
          })
        );

        setData(postsWithImages);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    loadData();
  }, [url]);

  return data;
}

export const getImageUrl = async (mediaLink) => {
  try {
    const response = await axios.get(mediaLink);
    const imageUrl = await response.data;
    return imageUrl[0]?.guid?.rendered;
  } catch (error) {
    console.error("Error fetching image details:", error);
    return null;
  }
};

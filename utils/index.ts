export const GetPhotoData = async (id: string) => {
  const response = await fetch(`https://api.unsplash.com/photos/${id}`, {
    headers: {
      Authorization: `Client-ID ${process.env.NEXT_PUBLIC_APP_UNSPLASH_ACCESSKEY}`,
    },
  });
  const data = await response.json();
  return data;
};

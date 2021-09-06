export function getStrapiMedia(url) {
  const imageUrl = url.startsWith("/")
  ? `${
    process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337"
  }${url}`
  : url;
return imageUrl;
  }
  
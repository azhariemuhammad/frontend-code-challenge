export const generateRandomUnsplashUrl = (width = 300, height = 200) => {
  // Unsplash API for random images
  const baseUrl = 'https://source.unsplash.com/random'

  // Add a random seed to ensure a new image each time
  const randomSeed = Math.random().toString(36).substring(7)

  // Construct the URL with desired width and height
  return `${baseUrl}/${width}x${height}?${randomSeed}`
}

// Example usage:
const imageUrl = generateRandomUnsplashUrl(400, 300)
console.log(imageUrl)

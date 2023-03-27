import { api, requestConfig } from '../utils/config'

// Publish an user's photo
const publishPhoto = async (data, token) => {
  const config = requestConfig('POST', data, token, true)

  try {
    const res = await fetch(api + '/photo', config)
      .then((res) => res.json())
      .catch((err) => err)

    return res
  } catch (error) {
    console.log(error)
  }
}

// Get user photos

// Get photo

// Delete a photo

// Update a photo

// Like a photo

// Add a comment to a photo

// Get all photos

const photoService = {
  publishPhoto,
}

export default photoService

const uploadImage = async (req, res) => {
  try {
    if (req.file) {
      const imageLink = await uploadCloudinary(req.file.path);

      return imageLink;
    } else res.status(400).json({ message: "No file uploaded" });
  } catch (error) {
    console.log("🚀 ~ file: Posts.js:46 ~ router.post ~ error:", error);
  }
};

const uploadCloudinary = async (imagePath) => {
  const options = {
    use_filename: true,
    unique_filename: false,
    overwrite: true,
  };

  try {
    const result = await cloudinary.uploader.upload(imagePath, options);
    return result.url;
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  uploadImage,
};

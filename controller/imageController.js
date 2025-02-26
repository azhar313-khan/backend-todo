exports.imageUpload = async (req, res) => {
  try {
    console.log("Uploading image");
    res.status(200).json({});
  } catch (error) {
    console.log(err, "error");
    res.status(404).send({ message: "server error", err });
  }
};

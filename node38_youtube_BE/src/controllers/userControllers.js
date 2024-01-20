const uploadSingleAvatar = (req, res) => {
  res.send(req.file);
};

const uploadMultipleAvatars = (req, res) => {
  res.send(req.files);
};

export { uploadSingleAvatar, uploadMultipleAvatars };

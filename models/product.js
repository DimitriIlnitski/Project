const mongoose = require('mongoose')

const Schema = mongoose.Schema

const productSchema = new Schema({
  name: String,
  ram: Number,
  color: String,
  price: Number,
})

/*
String newFileName = "my-image";
File imageFile = new File("/users/victor/images/image.png");
GridFS gfsPhoto = new GridFS(db, "photo");
GridFSInputFile gfsFile = gfsPhoto.createFile(imageFile);
gfsFile.setFilename(newFileName);
gfsFile.save();
*/


 // Attention de ne pas avoir des références circulaire
 // const UsersRepository = require('./usersRepository'); pas ici sinon référence ciculaire
const ImageFilesRepository = require('./imageFilesRepository.js');
const ImageModel = require('./image.js');
const utilities = require("../utilities");
const HttpContext = require('../httpContext').get();
const UsersRepository = require('./usersRepository.js');

module.exports =
    class ImagesRepository extends require('./repository') {
        constructor() {
            super(new ImageModel(), true /* cached */);
            this.setBindExtraDataMethod(this.bindImageURLAndUser);
            this.UsersRepository = new UsersRepository();
        }
        bindImageURLAndUser(image) {
            if (image) {
                let bindedImage = { ...image };
                if (image["GUID"] != "") {
                    bindedImage["OriginalURL"] = HttpContext.host + ImageFilesRepository.getImageFileURL(image["GUID"]);
                    bindedImage["ThumbnailURL"] = HttpContext.host + ImageFilesRepository.getThumbnailFileURL(image["GUID"]);
                } else {
                    bindedImage["OriginalURL"] = "";
                    bindedImage["ThumbnailURL"] = "";
                }
                let user = this.UsersRepository.get(bindedImage.UserId);
                if (user) {
                    bindedImage.Username = user.Name;
                    if (user.AvatarURL == 'https://vincentlepage-pfi-api.glitch.me/images/undefined.png')
                        bindedImage.UserAvatarURL = 'https://vincentlepage-pfi-api.glitch.me/ImagesManager2022/images/No_Avatar.png'
                    else
                        bindedImage.UserAvatarURL = user.AvatarURL
                }
                return bindedImage;
            }
            return null;
        }
        add(image) {
            if (this.model.valid(image)) {
                image["GUID"] = ImageFilesRepository.storeImageData("", image["ImageData"]);
                delete image["ImageData"];
                return this.bindImageURL(super.add(image));
            }
            return null;
        }
        update(image) {
            if (this.model.valid(image)) {
                image["GUID"] = ImageFilesRepository.storeImageData(image["GUID"], image["ImageData"]);
                delete image["ImageData"];
                return super.update(image);
            }
            return false;
        }
        remove(id) {
            let foundImage = super.get(id);
            if (foundImage) {
                ImageFilesRepository.removeImageFile(foundImage["GUID"]);
                return super.remove(id);
            }
            return false;
        }
    }
// thumbnailService.js
const sharp = require('sharp');

const generateThumbnail = async (inputPath, outputPath) => {
    try {
        await sharp(inputPath)
            .resize({ height: 200 }) // Set the height and let the width be automatically decided
            .toFile(outputPath);
        console.log('Thumbnail created successfully');
    } catch (error) {
        console.error('Error creating thumbnail:', error);
    }
};

module.exports = { generateThumbnail };

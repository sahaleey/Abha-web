// src/data/galleryData.js

// Auto import all meetup images
const meetupImages = import.meta.glob(
  "../assets/gallery/meetup/*.{jpg,jpeg,png}",
  { eager: true }
);

// Auto import all camp images
const campImages = import.meta.glob(
  "../assets/gallery/camp/*.{jpg,jpeg,png,JPG}",
  { eager: true }
);

// Convert object → array of image paths
const toArray = (imagesObj) =>
  Object.values(imagesObj)
    .map((img) => img.default)
    .sort(); // keeps order clean (1.jpg → 55.jpg)

const galleryData = [
  {
    event: "Meetup",
    images: toArray(meetupImages),
  },
  {
    event: "Camp Moments",
    images: toArray(campImages),
  },
  {
    event: "Creative Nights",
    images: [],
  },
];

export default galleryData;

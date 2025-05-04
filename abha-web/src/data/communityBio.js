// src/data/communityMembers.js
import ramees from "../assets/images/ramees.jpg";
import maamoon from "../assets/images/maamoon.jpg";
import jasil from "../assets/images/jasil.jpg";
import ashiq from "../assets/images/ashiq.jpg";
import swabah from "../assets/images/swabah.jpg";
import muhsin from "../assets/images/muhsin.png";
import bishr from "../assets/images/bishr.jpg";
import jalal from "../assets/images/jalal.jpg";
import ahmed from "../assets/images/ahmed.jpg";
import alameen from "../assets/images/alameen.jpg";
import anas from "../assets/images/anas.jpg";
import anshif from "../assets/images/anshif.jpg";
import anwar from "../assets/images/anwar.jpg";
import dilshad from "../assets/images/dilshad.jpg";
import favas from "../assets/images/favas.jpg";
import fayiz from "../assets/images/fayiz.jpg";
import ihsan from "../assets/images/ihsan.jpg";
import mabrook from "../assets/images/mabrook.jpg";
import muhammed from "../assets/images/muhammed.jpg";
import rasheed from "../assets/images/rasheed.jpg";
import ribin from "../assets/images/ribin.jpg";
import sahal from "../assets/images/sahal.jpg";
import sajad from "../assets/images/sajad.jpg";
import sinankm from "../assets/images/sinan km.jpg";
import sinanpm from "../assets/images/sinan pm.jpg";
import yaseen from "../assets/images/yaseen.jpg";
import ustd from "../assets/images/shreef u.jpg";

const communityMembers = [
  {
    slug: "usthad",
    name: "Muhammad Shareef Hudawi",
    role: "Class Teacher",
    image: ustd,
    address: "Pattimattam, Aluva, Ernakulam", // Corrected image path
    DOB: "29/10/1994",
    skill: "Malayalam Writer",
    isClassTeacher: true,
  },
  {
    slug: "ramees",
    name: "Ramees",
    role: "Second Leader",
    image: ramees,
    add: "516",
    address: "Kuzhimanna, Kizhisseri, Malappuram", // Corrected image path
    DOB: "4-11-2006",
    skill: "Singer",
    bio: "Creativity meets strategy to tell your story.",
  },
  {
    slug: "maamoon",
    name: "Ma'moon",
    role: "General Secretery + Academic cord.",
    image: maamoon, // Corrected image path
    DOB: "22/08/2007",
    add: "535",
    address: "Edathala, Malappuram",
    skill: "Arabic Scholar",
  },
  {
    slug: "jasil",
    name: "Muhammed Jasil T.J",
    role: "Treasure + Academic cord.",
    image: jasil, // Corrected image path
    DOB: "09/05/2008",
    skill: "Singer, Hadith expert, Arabic scholar",
  },
  {
    slug: "ashique",
    name: "Muhammed Ashique",
    role: "Al-Majma'ah Chair.",
    add: "536",
    address: "Muvattupuzha, Ernakulam",
    image: ashiq, // Corrected image path
    DOB: "25/02/2008",
    skill: "drawing, calligraphy",
  },
  {
    slug: "swabah",
    name: "Swabah",
    role: "English Hub Chair.",
    add: "545",
    address: "Kuttamashery, Aluva, Eranakulam",
    image: swabah, // Corrected image path
    DOB: "03/10/2008",
    skill: "English Scholar, Singer",
  },
  {
    slug: "muhsin",
    name: "Muhsin",
    role: "Auditing Board",
    add: "518",
    address: "Vaduthala, Jetty, Alappuzha",
    image: muhsin, // Corrected image path
    DOB: "16/05/2007",
    skill: "Tafheemul Quran",
  },
  {
    slug: "bishr",
    name: "Bishr",
    role: "Auditing Board",
    add: "564",
    address: "Ramankulam, Manjeri, Malappuram",
    image: bishr, // Corrected image path
    DOB: "29/09/2007",
    skill: "Singer, Artist",
  },
  {
    slug: "jalal",
    name: "Jalal",
    role: "Lisanul jazeera Conv.",
    add: "568",
    address: "Kottappuram, Mannarkad, Palakkad",
    image: jalal, // Corrected image path
    DOB: "17/11/2008",
    skill: "Orator Arabic",
    bio: "Creativity meets strategy to tell your story.",
  },
  {
    slug: "ihsan",
    name: "Ihsan",
    role: "English Hub Chair.",
    image: ihsan,
    add: "540",
    address: "Thaikattukkara, Aluva, Eranakulam", // Corrected image path
    DOB: "23/03/2009",
    skill: "Graphic Designer, English Expert",
  },
  {
    slug: "sinan-km",
    name: "Sinan KM",
    role: "Creative Designer",
    add: "537",
    address: "Ponjassery, Perumbavoor, Eranakulam",
    image: sinankm, // Corrected image path
    DOB: "24/07/2008",
    skill: "Graphic Designer, English Expert, Artist",
  },
  {
    slug: "al-ameen",
    name: "Al-Ameen",
    role: "President",
    add: "538",
    address: "Yedathala, Aluva, Ernakulam",
    image: alameen, // Corrected image path
    DOB: "05/11/2007",
    skill: "English Scholar, Motivational Speaker",
  },
  {
    slug: "sajad",
    name: "Sajad",
    role: "Vice President",
    add: "533",
    address: "Painkanniyoor, Venmenad, Thrissur",
    image: sajad,
    DOB: "21/12/2007",
    skill: "Artist",
  },
  {
    slug: "anshif",
    name: "Anshif",
    add: "553",
    address: "Cherukunnu, Malappuram",
    role: "Member",
    image: anshif, // Corrected image path
    DOB: "24/12/2007",
    skill: "Singer",
  },
  {
    slug: "rasheed",
    name: "Rasheed",
    role: "Social Affairs Chair.",
    add: "557",
    address: "Valanjeri, Malappuram",
    image: rasheed, // Corrected image path
    DOB: "08/07/2008",
    skill: "Urdu Writer",
  },
  {
    slug: "sahal",
    name: "Muhammed Sahal C.P",
    role: "Zuban e Ghalib Chair.",
    add: "551",
    address: "Thiruvambady, Kozhikkode",
    image: sahal, // Corrected image path
    DOB: "19/05/2008",
    skill: "Urdu Writer, Web Designer, Science Expert",
  },
  {
    slug: "ahmed",
    name: "Ahmed",
    role: "Malayala Koottaima Conv.",
    add: "545",
    address: "Kothamangalam, Ernakulam",
    image: ahmed, // Corrected image path
    DOB: "06/06/2007",
    skill: "Malayalam Writer, Singer, Raper, Song Writer",
  },
  {
    slug: "dilshad",
    name: "Dilshad",
    role: "Social Affair Conv.",
    image: dilshad,
    add: "552",
    address: "Cherur, Malappuram", // Corrected image path
    DOB: "09/05/2008",
    skill: "Arabic Writer",
    bio: "Creativity meets strategy to tell your story.",
  },
  {
    slug: "fayiz",
    name: "Fayiz",
    role: "Social Media Manager",
    image: fayiz,
    add: "567",
    address: "Kuttamashery, Aluva, Eranakulam", // Corrected image path
    DOB: "25/04/2008",
    skill: "Social Media Influencer",
  },
  {
    slug: "mabrook",
    name: "Mabrook",
    role: "Creative Designer",
    add: "499",
    address: "Muvattuppuzha, Eranakulam",
    image: mabrook, // Corrected image path
    DOB: "22/10/2007",
    skill: "Artist, RJ, Robotics Expert",
  },

  {
    slug: "yaseen",
    name: "Yaseen",
    role: "IQ Orbit Chair.",
    add: "559",
    address: "Thodupuzha, Idukki",
    image: yaseen, // Corrected image path
    DOB: "28/8/2007",
    skill: "GK Awareness",
  },

  {
    slug: "favas",
    name: "Favas",
    role: "Leader",
    add: "549",
    address: "Eranad, manjeri, malappuram",
    image: favas, // Corrected image path
    DOB: "08/09/2008",
    skill: "Actor, Inspiration talk",
  },
  {
    slug: "anas",
    name: "Anas",
    role: "Member",
    add: "507",
    address: "Chenthrapinni, Thrissure",
    image: anas, // Corrected image path
    DOB: "07/08/2007",
    skill: "Orator",
  },

  {
    slug: "anwar",
    name: "Anwar",
    role: "Joint Secretery + IQ Orbit Conv.",
    image: anwar,
    add: "495",
    address: "irukkupalam, Thodupuzha, Idukki", // Corrected image path
    DOB: "01/12/2006",
    skill: "GK awareness, MLM Essay",
  },
  {
    slug: "sinan-pm",
    name: "Sinan Pm",
    role: "Zubane e Ghalib Conv.",
    add: "558",
    address: "Pattambi, Palakkad",
    image: sinanpm, // Corrected image path
    DOB: "09/05/2008",
    skill: "Urdu Writer",
  },
  {
    slug: "ribin",
    name: "Ribin",
    role: "P.R.O",
    add: "480",
    address: "Kuttippuram, Malappuram",
    image: ribin, // Corrected image path
    DOB: "13/11/2006",
    skill: "Leadership, Excell expert",
  },
  {
    slug: "mohammed",
    name: "Mohammed",
    role: "Malayala Koottaima Chair.",
    image: muhammed,
    add: "539",
    address: "Pezhakkappilly, Eranakulam", // Corrected image path
    DOB: "22/08/2008",
    skill: "Malayalam Writer, Graphic Designer",
  },
  // Add more members as needed
];

export default communityMembers;

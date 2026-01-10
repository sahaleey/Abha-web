
const images = import.meta.glob(
  "../assets/programmeImages/*.{jpg,jpeg,png}",
  { eager: true }
);

const img = (name) =>
  images[`../assets/programmeImages/${name}`]?.default;

export const alreadyDoneProgrammes = [
  {
    id: 1,
    name: "Head start",
    stage: "7th Class",
    host: "Rafi Hudawi Muvattupuzha",
    date: "31/04/2025",
    time: "4 : 20 PM",
    image: img("rafikka.jpg"),
    description:
      "Head Start marked the energetic launch of our journey, setting direction and purpose.",
  },
  {
    id: 2,
    name: "ABHA Official inauguration",
    stage: "7th Class",
    host: "Usthad Younus Hudawi",
    date: "31/04/2025",
    time: "6 : 00 AM",
    image: img("INAGRU CMYK.jpg"),
    description:
      "The official inauguration of Abha community celebrating new beginnings.",
  },
  {
    id: 3,
    name: "വിയർപ്പു തുന്നിയിട്ട കുപ്പായം",
    stage: "Inter lock",
    wing: "Malayalam Wing",
    host: "Ahmed Zainudheen",
    date: "01/05/2025",
    time: "11 : 20 AM",
    image: img("labour day.jpg"),
    description:
      "Labour Day program honoring the dignity and dedication of workers.",
  },
  {
    id: 4,
    name: "നേർകാഴ്ച",
    stage: "Radio",
    wing: "IQ Orbit",
    host: "Yaseen Pi, Anwar",
    date: "03/05/2025",
    time: "08 : 15 PM",
    image: img("ptti copy.jpg"),
    description:
      "Live radio discussion on freedom of media conducted on World Press Day.",
  },
  {
    id: 5,
    name: "Defend freedom of Press",
    date: "03/05/2025",
    image: img("press.jpg"),
    description: "World Press Day special poster promoting press freedom.",
  },
  {
    id: 6,
    name: "നൻ പകൽ നേരത്തെ ജോലി",
    date: "01/05/2025",
    image: img("labourday.jpg"),
    description: "World Labour Day special poster.",
  },
  {
    id: 7,
    name: "ഒന്നും ഒന്നും ഒന്ന്",
    stage: "Out Campus",
    host: "ABHA",
    date: "05/05/2025",
    time: "06 : 00 AM to 10 : 00 PM",
    image: img("main pos.jpg"),
    description:
      "An out-campus initiative emphasizing unity and collaboration.",
  },
  {
    id: 8,
    name: "Al-Dheenu Al-Nasweeha",
    stage: "Out Campus",
    host: "Usthad Shuaib Hudawi",
    date: "05/05/2025",
    time: "In Camp",
    image: img("shuhaib std.jpg"),
    description:
      "A spiritual session focusing on faith, sincerity, and moral guidance.",
  },
  {
    id: 9,
    name: "Let Me Fly",
    stage: "Out Campus",
    host: "Usthad Abi Vakkas Usthad",
    date: "05/05/2025",
    time: "In Camp",
    image: img("wa.jpg"),
    description:
      "A motivational program encouraging students to rise beyond limits.",
  },
  {
    id: 10,
    name: "Mothers day : Special poster",
    date: "11/05/2025",
    image: img("ig 2.jpg"),
    description:
      "A tribute celebrating the unconditional love and sacrifices of mothers.",
  },
  {
    id: 11,
    name: "Know The Legend",
    stage: "7th Class",
    wing: "English Wing",
    host: "English Wing",
    date: "Every Tuesday",
    image: img("know the legend.jpg"),
    description:
      "A literary series introducing legendary figures in English literature.",
  },
  {
    id: 12,
    name: "Nurse Day : Special Poster",
    date: "12/05/2025",
    image: img("nurse day.jpg"),
    description:
      "International Nurses Day poster honoring healthcare heroes.",
  },
  {
    id: 13,
    name: "Al-Judoor",
    stage: "7th Class",
    wing: "ABHA Academia",
    host: "Ma'moon",
    date: "01/05/2025",
    time: "8 : 00 PM",
    image: img("aljoddor copy.jpg"),
    description:
      "An Arabic grammar foundation initiative by Abha Academia.",
  },
  {
    id: 14,
    name: "Fluent Flicks",
    stage: "7th Class",
    wing: "English Wing",
    host: "Ihsan",
    date: "Every Wednesday",
    time: "8 : 30 PM",
    image: img("fluent.jpg"),
    description:
      "An English vocabulary program through fun and interactive learning.",
  },
  {
    id: 15,
    name: "ABHA Parliament - Janashabdam",
    stage: "7th Class",
    host: "Class leader",
    date: "All Month last Week",
    time: "9 : 30 PM",
    image: img("janam.jpg"),
    description:
      "A leadership platform encouraging participation and responsibility.",
  },
  {
    id: 16,
    name: "Carrier Guidance",
    stage: "7th Class",
    host: "Usthad Muhammad Asif Hudawi",
    date: "15/05/2025",
    time: "3 : 20 PM",
    image: img("moria.jpg"),
    description:
      "Career guidance session helping students make informed choices.",
  },
  {
    id: 17,
    name: "നേര്‍കാഴ്ച - മോദിയോടുള്ള ചോദ്യങ്ങള്‍",
    wing: "IQ Orbit",
    stage: "In front of 7th Class",
    host: "Anwar Sadath",
    date: "13/05/2025",
    time: "9 : 30 PM",
    image: img("ner.jpg"),
    description:
      "A discussion encouraging critical political awareness.",
  },
  {
    id: 18,
    name: "لطائف قرآنية",
    wing: "ABHA Academia",
    stage: "7th Class",
    host: "Ma'moon",
    date: "01/05/2025",
    time: "6 : 30 AM",
    image: img("لطائف قرآنية copy.jpg"),
    description:
      "A Qur’anic insight session exploring wisdom and deeper meanings.",
  },
  {
    id: 19,
    name: "നേര്‍കാഴ്ച - 3 diffrent topic",
    stage: "In front of 7th Class",
    wing: "IQ Orbit",
    host: "IQ Orbit",
    date: "21/05/2025",
    time: "9 : 30 PM",
    image: img("nerkazhcha-1.jpg"),
    description:
      "Discussion sessions on diverse topics to spark critical thinking.",
  },
  {
    id: 20,
    name: "World Anti-Terrorist day - Special poster",
    date: "21/05/2025",
    image: img("anti-terror.jpg"),
    description:
      "A poster promoting peace and awareness against terrorism.",
  },
  {
    id: 21,
    name: "ABHA Official web launching",
    stage: "Masjid Ground floor",
    host: "Usthad Muhammed Shafi Hudawi",
    date: "21/05/2025",
    time: "1 : 30 PM",
    image: img("web-launch.jpg"),
    description:
      "Official launch of Abha’s website marking a digital milestone.",
  },
  {
    id: 22,
    name: "Brothers day",
    date: "24/05/2025",
    image: img("brothers abha 1.png"),
    description:
      "Celebrating the bond of love, laughter, and brotherhood.",
  },
  {
    id: 23,
    name: "Web Design Course",
    stage: "7th Class",
    host: "Usthad Muhammed Rahoof Hudawi",
    date: "18/05/2025",
    time: "9 : 30 PM",
    image: img("website.jpg"),
    description:
      "A practical course on modern web design fundamentals.",
  },
  {
    id: 24,
    name: "Tabloid - Koottezhuth Publication",
    wing: "Malayalam Wing",
    stage: "Masjid Ground floor",
    date: "21/05/2025",
    time: "1 : 30 PM",
    image: img("KOOTTEZHUTH.jpg"),
    description:
      "A Malayalam tabloid celebrating family values and stories.",
  },
  {
    id: 25,
    name: "Grammer Hunt",
    wing: "Urdu Wing",
    stage: "7th Class",
    host: "Muhammed Sahel cp",
    time: "8 : 00 PM",
    image: img("urdu wng.jpg"),
    description:
      "An engaging Urdu grammar challenge for language mastery.",
  },
  {
    id: 26,
    name: "Ummak Oru Kath",
    stage: "Home",
    host: "Usthad Muhammed Shareef Hudawi",
    image: img("ig.jpg"),
    description:
      "Students write emotional letters expressing love for their mothers.",
  },
  {
    id: 27,
    name: "Mission 50K",
    stage: "7th Class",
    host: "Core Team",
    image: img("50k.jpg"),
    description:
      "A reading initiative challenging students to read 50,000 pages.",
  },
  {
    id: 28,
    name: "Rain Malayalam Tabloid",
    wing: "Malayalam Wing",
    image: img("rain mlm copy .jpg"),
    description:
      "A tabloid capturing rain-soaked emotions and reflections.",
  },
  {
    id: 29,
    name: "Abu Hassan Ali Hassan Biography",
    wing: "Arabic Wing",
    stage: "7th Class",
    host: "Arabic Wing",
    date: "21/06/2025",
    image: img("abu (1).jpg"),
    description:
      "A tabloid released for International Reading Day.",
  },
  {
    id: 30,
    name: "How to study scientifically",
    wing: "Academic Wing",
    stage: "7th Class",
    host: "Ma'Moon",
    date: "23/05/2025",
    image: img("academia documentary.jpg"),
    description:
      "A session on scientific study techniques and smart learning.",
  },
  {
    id: 31,
    name: "അക്ഷരവീഥി",
    stage: "7th Class",
    host: "Usthad Ajnas Hudawi",
    date: "19/06/2025",
    image: img("ajnas.jpg"),
    description: "",
  },
  {
    id: 32,
    name: "ആശയ വ്യാഖ്യാനം",
    stage: "7th Class",
    wing: "Malayalam Wing",
    host: "Muhammed Ameen",
    date: "19/06/2025",
    image: img("ashaya,.jpg"),
    description: "",
  },
];



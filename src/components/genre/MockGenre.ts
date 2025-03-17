import horrorBackground from "@/assets/backgrounds/Horror.webp";
import actionBackground from "@/assets/backgrounds/Action.webp";
import romanceBackground from "@/assets/backgrounds/Romance.webp";
import paranormalBackground from "@/assets/backgrounds/Paranormal.webp";
import spiritualBackground from "@/assets/backgrounds/Spiritual.webp";
import generalFictionBackground from "@/assets/backgrounds/Generalfiction.webp";
import historyFictionBackground from "@/assets/backgrounds/Historicalfiction.webp";
import teenFictionBackground from "@/assets/backgrounds/Teenfiction.webp";
import adventureBackground from "@/assets/backgrounds/Adventure.webp";
import scienceFictionBackground from "@/assets/backgrounds/Sciencefiction.webp";
import mysteryBackground from "@/assets/backgrounds/Mystery.webp";
import fantasyBackground from "@/assets/backgrounds/Fantasy.webp";
import thrillerBackground from "@/assets/backgrounds/Thriller.webp";
import { Genre } from "@/types/Book";

export const genres: Genre[] = [
  {
    id: 1,
    name: "Teen Fiction",
    description: "Keep true to the dreams of your youth.",
    backgroundImage: teenFictionBackground,
  },
  {
    id: 2,
    name: "Mystery",
    description:
      "Knowledge does not eliminate the sense of wonder and mystery. There is always more to discover.",
    backgroundImage: mysteryBackground,
  },
  {
    id: 3,
    name: "Science Fiction",
    description:
      "Science fiction has always served as a morality tale and will continue to do so.",
    backgroundImage: scienceFictionBackground,
  },
  {
    id: 4,
    name: "Adventure",
    description: "A passport to endless adventures is reading.",
    backgroundImage: adventureBackground,
  },
  {
    id: 5,
    name: "General Fiction",
    description:
      "Ultimately, fiction is the art of telling the truth through lies",
    backgroundImage: generalFictionBackground,
  },
  {
    id: 6,
    name: "Historical Fiction",
    description:
      "History is just a series of unexpected events. It can only get us ready to be shocked once more.",
    backgroundImage: historyFictionBackground,
  },
  {
    id: 7,
    name: "Fantasy",
    description:
      "Fantasy isn't much of an escape from reality. It's a method of comprehending it.",
    backgroundImage: fantasyBackground,
  },
  {
    id: 8,
    name: "Thriller",
    description: "The darkest secrets are hidden behind the sweetest smiles.",
    backgroundImage: thrillerBackground,
  },
  {
    id: 9,
    name: "Action",
    description: "The little hand says it's time to rock and roll.",
    backgroundImage: actionBackground,
  },
  {
    id: 10,
    name: "Horror",
    description:
      "Be ready to be surprised when you believe you have read everything. A brand-new collection of terrifying stories and unearthly terrors.",
    backgroundImage: horrorBackground,
  },
  {
    id: 11,
    name: "Romance",
    description: "Read the beloved stories.",
    backgroundImage: romanceBackground,
  },
  {
    id: 12,
    name: "Paranormal",
    description: "As we gazed intently at Death's face, Death blinked first.",
    backgroundImage: paranormalBackground,
  },
  {
    id: 13,
    name: "Spiritual",
    description: "Silence is the path of spirituality.",
    backgroundImage: spiritualBackground,
  },
];

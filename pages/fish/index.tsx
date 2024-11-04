import { useState } from "react";

const firsts = [
  "Northern",
  "Eastern",
  "Western",
  "Southern",
  "North American",
  "South American",
  "European",
  "Asian",
  "African",
  "Australian",
  "Rock",
  "Common",
  "White",
  "Blue",
  "Pink",
  "Yellow",
  "Orange",
  "Green",
  "Red",
  "Black",
  "Brown",
  "Gray",
  "Golden",
  "Silver",
];
const seconds = [
  "Pikes",
  "Bass",
  "Minnor",
  "Shiner",
  "Sucker",
  "Darter",
  "Sculpin",
  "Perch",
  "Sunfish",
  "Catfish",
  "Trout",
  "Salmon",
  "Tuna",
  "Cod",
  "Haddock",
  "Hake",
  "Pollock",
  "Halibut",
  "Flounder",
  "Sole",
  "Plaice",
  "Turbot",
  "Mackerel",
  "Sardine",
  "Anchovy",
  "Herring",
  "Sprat",
  "Pilchard",
  "Tilapia",
  "Carp",
  "Bream",
  "Rudd",
  "Roach",
  "Dace",
  "Chub",
  "Barbel",
  "Tench",
  "Crucian",
  "Perch",
  "Pike",
  "Zander",
  "Eel",
  "Sturgeon",
  "Bullhead",
  "Gudgeon",
  "Loach",
  "Minnow",
];

export default function FishPage() {
  const [fish, setFish] = useState<string | null>(null);

  const getRandomFish = () => {
    const name = `${firsts[Math.floor(Math.random() * firsts.length)]} ${
      seconds[Math.floor(Math.random() * seconds.length)]
    }`;
    setFish(name);
  };

  return (
    <div>
      <h1>here's a fish. It probably does not exist </h1>
      <button onClick={getRandomFish}>Get Random Fish</button>
      {fish && <p>{fish}</p>}
    </div>
  );
}

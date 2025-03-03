import { useState } from "react";
import firsts from "./firstbirds.json";
import seconds from "./secondbirds.json";

export default function BirdPage() {
  const [bird, setBird] = useState<string | null>(null);

  const getRandomBird = () => {
    const name = `${firsts[Math.floor(Math.random() * firsts.length)]} ${
      seconds[Math.floor(Math.random() * seconds.length)]
    }`;
    setBird(name);
  };

  return (
    <div>
      <h1>
        here's a bird. It probably does not exist, but it might, who knows.
      </h1>
      <p>
        I did a little scrape of this{" "}
        <a href="https://en.wikipedia.org/wiki/List_of_birds_by_common_name">
          wikipedia page
        </a>
        , split it up so I had unique "first" and "last" bird names, and made
        them randomly recombine here. Or is saying this taking the magic away?
        :0
      </p>
      <button onClick={getRandomBird}>Get Random Bird</button>
      {bird && <p>{bird}</p>}
    </div>
  );
}

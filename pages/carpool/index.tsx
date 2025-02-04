import { useState } from "react";
function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

type Person = { name: string; driver: boolean; isChecked?: boolean };
const data: Person[] = [
  { name: "Charles", driver: true },
  { name: "Kevin", driver: true },
  { name: "Nathan", driver: true },
  { name: "Gena", driver: true },
  { name: "Francesca", driver: true },
  { name: "Paige", driver: true },
  { name: "Linda", driver: true },
  { name: "Shreya", driver: false },
  { name: "Lavinia", driver: false },
];

const locations = [
  { name: "macheko", priority: 10 },
  { name: "cupsnchai", priority: 10 },
  { name: "nq", priority: 5 },
  { name: "jail on hogback road", priority: 1 },
  { name: "kathleen's house", priority: 2 },
  { name: "Galaxy's house", priority: 2 },
  { name: "Rocco's house", priority: 10 },
  { name: "Linda's house", priority: 10 },
  { name: "Munger", priority: 2 },
  { name: "Ashley's", priority: 5 },
  { name: "Bill's", priority: 5 },
  { name: "the arb", priority: 2 },
];
const totalLocationPoints = locations.reduce(
  (prev, curr) => prev + curr.priority,
  0,
);

export default function CarpoolPage() {
  const [people, setPeople] = useState<Person[]>(data);
  const [drivers, setDrivers] = useState<Person[]>([]);
  const [passengers, setPassengers] = useState<Person[][]>([]);
  const [noDrivers, setNoDrivers] = useState<boolean>(false);
  const [isLimo, setIsLimo] = useState<boolean>(false);
  const [location, setLocation] = useState<string>("");

  function pick(attendees: Person[]) {
    const availableDrivers = shuffle(attendees.filter((a) => a.driver));
    if (!availableDrivers.length) {
      setNoDrivers(true);
      return;
    }
    if (attendees.length > 7) {
      setIsLimo(true);
      return;
    }
    setNoDrivers(false);
    setIsLimo(false);
    // up to 3 drivers, but not more than the number
    // available to drive, and not less than what's needed to fit everyone
    // in the car
    const nDrivers = Math.min(
      Math.max(
        Math.min(Math.ceil(Math.random() * 3), availableDrivers.length),
        Math.ceil(attendees.length / 5),
      ),
      Math.ceil(attendees.length / 2),
    );
    const pickedDrivers = availableDrivers.splice(0, nDrivers);
    const pickedPassengers = [];
    const availablePassengers = [...attendees].filter(
      (p) => !pickedDrivers.map((d) => d.name).includes(p.name),
    );
    const passengersPerCar = Math.ceil(
      (attendees.length - nDrivers) / nDrivers,
    );
    Array(nDrivers)
      .fill(0)
      .forEach(() => {
        const passengerSet = availablePassengers.splice(0, passengersPerCar);
        pickedPassengers.push(passengerSet);
      });
    setDrivers(pickedDrivers);
    setPassengers(pickedPassengers);
    setLocation(pickLocation());
  }

  function pickLocation() {
    let pts = 0;
    const endingPriority = Math.random() * totalLocationPoints;
    let pickedLocation;
    locations.forEach((loc) => {
      if (pickedLocation) {
        return;
      }
      pts = loc.priority + pts;
      if (pts > endingPriority) {
        pickedLocation = loc;
      }
    });

    return pickedLocation.name;
  }
  return (
    <div>
      <div>
        <div>Pick attendees:</div>
        {people.map((p) => {
          return (
            <div>
              <button
                style={{
                  padding: "0.2rem",
                  cursor: "pointer",
                  width: "20ch",
                  transition: "background-color 400ms",
                  background: p.isChecked ? "#c6c6c6" : "",
                  border: "solid 1px black",
                }}
                onClick={() => {
                  setPeople((prev) =>
                    prev.map((prevP) =>
                      prevP.name === p.name
                        ? { ...p, isChecked: !p.isChecked }
                        : prevP,
                    ),
                  );
                }}
              >
                <span>{p.name}</span>
                <label htmlFor={`${p.name}checkbox`} />
                <input
                  id={`${p.name}checkbox`}
                  type="checkbox"
                  checked={p.isChecked || false}
                  onChange={(e) => {
                    setPeople((prev) =>
                      prev.map((prevP) =>
                        prevP.name === p.name
                          ? { ...p, isChecked: e.target.checked }
                          : prevP,
                      ),
                    );
                  }}
                />
              </button>
            </div>
          );
        })}
      </div>
      <br />
      <button
        onClick={() => {
          pick(people.filter((p) => p.isChecked));
        }}
      >
        Update attendees list
      </button>
      <br />
      <br />
      {drivers.length ? (
        <div>
          <div id="drivers">
            {drivers.map((d, i) => {
              return (
                <div>
                  {d.name}'s car:&nbsp;
                  <span>{passengers[i].map((p) => p.name).join(", ")}</span>
                </div>
              );
            })}
          </div>
          <div>Adventure destination: {location}</div>
          <br />
          <button onClick={() => pick(people.filter((p) => p.isChecked))}>
            Pick again
          </button>
        </div>
      ) : null}
      {noDrivers ? (
        <p>
          Nobody with a license was picked. Everyone had to stay home and work
          on their papers. Nobody had fun.
        </p>
      ) : null}
      {isLimo ? (
        <div>
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/dQw4w9WgXcQ?si=XuzyXnuZiWnmIhVN&autoplay=1"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          ></iframe>
          <img src="/limo.webp" />
        </div>
      ) : null}
      <div>
        <img src="/meme.png" />
      </div>
    </div>
  );
}

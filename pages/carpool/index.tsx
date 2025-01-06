import {useState} from 'react'
function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5)
}

type Person = 
{name: string, driver: boolean, isChecked?: boolean}
const data: Person[] = [
  {name: "Charles", driver: true},
  {name: "Kevin", driver: true},
  {name: "Nathan", driver: true},
  {name: "Gena", driver: true},
  {name: "Francesca", driver: true},
  {name: "Paige", driver: true},
  {name: "Linda", driver: true},
  {name: "Shreya", driver: false},
  {name: "Lavinia", driver: false},
]

export default function CarpoolPage(){
  const [people, setPeople] = useState<Person[]>(data)
  const [drivers, setDrivers] = useState<Person[]>([])
  const [passengers, setPassengers] = useState<Person[][]>([])
  function pick(attendees: Person[]){
    let availableDrivers = attendees.filter(a => a.driver)
    // stupidly hard-coding
    if(attendees.length <= 5){
      const driver = availableDrivers[Math.floor(availableDrivers.length * Math.random())]
      setDrivers([driver])
      const passengers = attendees.filter(a => a.name != driver.name)
      setPassengers([passengers])
    } else {
      const firstDriver = availableDrivers[Math.floor(availableDrivers.length * Math.random())]
      availableDrivers = attendees.filter(a => a.driver && a.name !== firstDriver.name)
      const secondDriver = availableDrivers[Math.floor(availableDrivers.length * Math.random())]
      setDrivers([firstDriver, secondDriver])

      const shuffledAttendees = shuffle(attendees.filter(a => 
        a.name !== firstDriver.name && a.name !== secondDriver.name
      ))

      const halfAttendees = Math.floor(shuffledAttendees.length / 2)
      const firstPassengers = shuffledAttendees.slice(0, halfAttendees)
      const secondPassengers = shuffledAttendees.slice(halfAttendees)
      setPassengers([firstPassengers, secondPassengers])
    }
  }
  return <div>
    <div>
      <div>
        Pick attendees:
      </div>
      {people.map(p => {
        return <div>
          <span>{p.name}</span>
          <label htmlFor={`${p.name}checkbox`} />
          <input 
id = {`${p.name}checkbox`} 
            type="checkbox" 
            checked={p.isChecked || false}
            onChange={(e) => {
              setPeople((prev) => 
                prev.map(prevP => 
                         prevP.name === p.name ? 
                           { ...p, isChecked: e.target.checked} : 
                           prevP
              )
                       )}}
          />
        </div>
      })}
    </div>
    <br />
    <button onClick={() => {
      pick(people.filter(p => p.isChecked))
      }}>
      Update attendees list
    </button>
    <br />
    <br />
    {
      drivers.length ? <div>
    <div id="drivers">
      {drivers.map((d, i) => {
        return <div>
          {d.name}'s car:&nbsp;
          <span>
            {passengers[i].map(p => p.name).join(', ')}
            </span>
        </div>
      })}
    </div> 
    <br />
      <button onClick={() => pick(people.filter(p => p.isChecked))}>Pick again</button>
      </div> : null
    }
  </div>
}

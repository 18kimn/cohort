import {useEffect, useState, useRef} from 'react'

// Coord = {x: number, y: number}

export default () => {
    const div = useRef(null)
    const [coord, setCoord] = useState({x: 0, y: 0}) //pos 3 and 4
    const newCoord = {x: 0, y: 0} //pos 1 and 2
    
      function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        setCoord({x: e.clientX, y: e.clientY})
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
      }
    
      function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        newCoord.x = coord.x - e.clientX;
        newCoord.y = coord.y - e.clientY;

        // set the element's new position:
        setCoord({x: e.clientX, y: e.clientY})

        div.current.style.top = (div.current.offsetTop - newCoord.y) + "px";
        console.log("X: " + div.current.offsetTop + "   Y: " + div.current.offsetLeft);
        //console.log(div.current.parentElement);
        div.current.style.left = (div.current.offsetLeft - newCoord.x) + "px";
      }
    
      function closeDragElement() {
        // stop moving when mouse button is released:
        document.onmouseup = null;
        document.onmousemove = null;
      }



    return <div ref={div} className="card" onMouseDown={dragMouseDown}>
    DRAG ME
    </div>
}

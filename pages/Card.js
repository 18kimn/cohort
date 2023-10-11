import {useEffect, useState, useRef} from 'react'

// Cooord = {x: nunber, y: number}

export default () => {
    const div = useRef(null)
    const [coord, setCoord] = useState({x: 0, y: 0})
    
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
        const newCoord = {x: coord.x - e.clientX, y: coord.y- e.clientY}
        // set the element's new position:
        div.current.style.top = (div.current.offsetTop - newCoord.y) + "px";
        div.current.style.left = (div.current.offsetLeft - newCoord.x) + "px";
        setCoord({x: e.clientX, y: e.clientY})
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

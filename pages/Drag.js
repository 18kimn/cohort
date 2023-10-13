import Draggable, {DraggableCore} from 'react-draggable'; // Both at the same time


export default (props) => {
    return (
        <Draggable
          axis="both"
          defaultPosition={{x: 0, y: 0}}
          position={null}
          //grid={[15, 15]}
          scale={1}
          >
          <div className="card">
            <div>{props.text}</div>
          </div>
        </Draggable>
      );
}
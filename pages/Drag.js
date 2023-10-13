import Draggable, {DraggableCore} from 'react-draggable'; // Both at the same time



export default (props) => {
    return (
        <Draggable
          axis="both"
          defaultPosition={{x: props.x, y: props.y}}
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
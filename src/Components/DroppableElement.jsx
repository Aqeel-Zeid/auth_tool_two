import React from 'react'


// Droppable Element Wrapper 
// Wrap the Drag N Droppable Elements in toolbars like icons which allows user to drag and drop elements to the canvas
export default function DroppableElement({ origin, droppingElementData, children }) {
    
    //origin defines where it is dragged from ex : LEFT_TOOLBAR, RIGHT_TOOLBAR, CONTEXT_MENU etc
    // droppingElementData defines is used to describe the initital properties of the element to be drawn in the screen 
    //This data is transfered through the drag even handler to the drop location , so that when the element is dropped the droppingElementData tells how to render it in the canvas
    // droppingElementData -> h = initial height , w = initial width, dragImage = transparentimage that shows up on your curser location while you are dragging
    // Also can include properties which instruct which NonRootContainer type to render such as containerType etc.

    const { dragImage  } = droppingElementData
    
    return (
        <div
            //style={{ padding: "1em", marginLeft: "1em", marginRight: "1em", backgroundColor: "bisque" }}
            draggable={true}
            onDragStart={e => {
                console.log("Drag Start")
                e.dataTransfer.dropEffect = "copy";
                var img = new Image();
                img.src = dragImage;
                e.dataTransfer.setDragImage(img, 0, 0);
                e.dataTransfer.setData("application/x.origin", origin);
                e.dataTransfer.setData("application/x.droppingElementData", JSON.stringify(droppingElementData));
            }}
        >
            {children}
        </div>
    )
}

function dragElement(div_element_to_drag) {
    // make the remote draggable
    div_element_to_drag.draggable = "true";

    div_element_to_drag.addEventListener("dragstart", e => {
        e.dataTransfer.setData("text/plain", div_element_to_drag.id);
    });

    for (const dropZone of document.querySelectorAll(".drop-zone")) {
        // when a draggable element is over a drop zone (cell)
        dropZone.addEventListener("dragover", e => {
            // prevent refreshing
            e.preventDefault();

            if (dropZone.innerHTML.id === undefined) {
                // console.log('LINE 26: id is undefined');
                dropZone.classList.add("drop-zone--over");
            }
        });

        // when the draggable element is no longer over the drop zone
        dropZone.addEventListener("dragleave", e => {
            dropZone.classList.remove("drop-zone--over");
        });

        // when a draggable element is dropped onto a drop zone (cell)
        dropZone.addEventListener("drop", e => {

            // check if the cell is already occupied
            // if it is - reject dropping
            if (!isCellOccupied[dropZone.id]) {
                e.preventDefault();

                // get the id of the dragged data and obtain the actual element via the id
                const droppedElementId = e.dataTransfer.getData("text/plain");
                const droppedElement = document.getElementById(droppedElementId);

                // append element onto the cell it has been dropped
                // we are appending the remote video to the new cell
                dropZone.appendChild(droppedElement);

                isCellOccupied[dropZone.id] = true;

                // remove the opacity
                dropZone.classList.remove("drop-zone--over");

                // apply panning
                var tokenized = droppedElementId.split("_");
                var peer_id = tokenized[2];

                panNode[peer_id].pan.value = applyPanning[dropZone.id];

                // re-populate isCellOccupied
                for (const dropZoneInner of document.querySelectorAll(".drop-zone")) {
                    if (!dropZoneInner.innerHTML) {
                        isCellOccupied[dropZoneInner.id] = false;
                    } else {
                        isCellOccupied[dropZoneInner.id] = true;
                    }
                }
            } else {
                // do nothing
                e.preventDefault();
            }
        });
    }
}
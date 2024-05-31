const draggables = document.querySelectorAll(".task");
const droppables = document.querySelectorAll(".swim-lane");

draggables.forEach((task) => {
    task.addEventListener("dragstart", () => {
        task.classList.add("is-dragging");
    });
    task.addEventListener("dragend", () => {
        task.classList.remove("is-dragging");
    })
});


droppables.forEach((zone) => {
    zone.addEventListener("dragover", (e) => {
        e.preventDefault();

        const bottomTask = InsertAboveTask(zone, e.clientY); // Y position of the mouse
        const curTask = document.querySelector(".is-dragging");

        // To shuffle the task, not just apped it to the bottom of the list
        if(!bottomTask){
            zone.appendChild(curTask);
        } else{
            zone.insertBefore(curTask, bottomTask);
        }
    })
});


const InsertAboveTask = (zone, mouseY) => {
    const els = zone.querySelectorAll(".task:not(.is-dragging)");

    let closestTask = null;
    let closestOffset = Number.NEGATIVE_INFINITY;

    els.forEach((task) => {
        const { top } = task.getBoundingClientRect();
        
        const offset = mouseY - top;
    
        if(offset < 0 && offset > closestOffset) {
            closestOffset = offset;
            closestTask = task;
        }
    })
            return closestTask;
}




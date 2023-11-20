import React, { useState } from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import _ from "lodash"
export default function DragDropDnD(props) {
 const [state, setState]=useState({
    toDo:{
        id: '1',
        items: [
            {id: "1", taskName: "task 1"},
            {id: "2", taskName: "task 2"},
            {id: "3", taskName: "task 3"},
        ]
    },
    inProgress:{
        id: 'inProgress',
        items: [
            {id: "4", taskName: "task 4"},
            {id: "5", taskName: "task 5"},
            {id: "6", taskName: "task 6"},
        ]
    },
    done:{
        id: 'done',
        items: [
            {id: "7", taskName: "task 7"},
            {id: "8", taskName: "task 8"},
            {id: "9", taskName: "task 9"},
        ]
    },
 })
 const handleDragEnd = (result)=>{
    let {destination, source} = result;
    if(!destination){
        return;
    }
    if(destination.index === source.index && destination.droppableId ===source.droppableId){
        return;
    }
    let itemCopy = {...state[source.droppableId].items[source.index]}
 }
    return (
    <div className='container '>
        <h3 className='text-center display-4'>DEMO DRAG DROP</h3>
        <DragDropContext onDragEnd={handleDragEnd}>
            <div className='row'>
        {_.map(state, (statusTask,index)=>{
            return <Droppable droppableId={statusTask.id} key={index}> 
                {(provided)=>{
                    return <div className='col-4 '>
                        <div className='bg-dark   p-5'  key={index} 
                     ref={provided.innerRef}
                    {...provided.droppableProps}
                    >
                        {statusTask.items.map((item, idx)=>{
                            return  <Draggable key={item.id} index={index}
                            draggableId={item.id}>
                                {(provided)=>{
                                    return <div 
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    className='mt-2 p-2 bg-white text-center'>
                                    {item.taskName}
                                        </div>
                                }}
                            </Draggable>
                            
                            
                        })}
                        {provided.placeholder}
                        </div>
                        </div>
                }}
                
            </Droppable>
        })}
        </div>
        </DragDropContext>
       
    </div>
  )
}

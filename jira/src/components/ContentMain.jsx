import React from 'react'
import { useDispatch } from 'react-redux';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { UPDATE_STATUS_TASK_SAGA } from '../constants/taskConstant';



export default function ContentMain(props) {
  const dispatch = useDispatch()
  const {projectDetail} = props;

  const handleDragEnd = (result)=>{
    console.log(result);
    //gọi api cập nhật status
    let {projectId, taskId} = JSON.parse(result.draggableId);
    let {source, destination} = result;
    if(!result.destination){
      return;
    }
    if(source.index === destination.index && source.droppableId === destination.droppableId ){
      return;
    }
    dispatch({
      type: UPDATE_STATUS_TASK_SAGA,
      taskUpdateStatus: {
        "taskId": taskId,
        "statusId": destination.droppableId,
        "projectId": projectId
      }

    })
  }
  const renderCardTaskList = () => {
    return <DragDropContext onDragEnd={handleDragEnd}>
      {projectDetail.lstTask?.map((taskListDetail, index)=>{
      return <Droppable key={index} droppableId={taskListDetail.statusId}>
        {(provided)=>{
          return   <div
           className="card pb-2" style={{width: '17rem', height: 'auto'}} >
          <div className="card-header">
             {taskListDetail.statusName}
          </div>
          <div ref={provided.innerRef}
          {...provided.droppableProps}
          key={index} className="list-group list-group-flush" style={{height:"100%"}}>
           {taskListDetail.lstTaskDeTail.map((task, index)=>{
            return  <Draggable key={task.taskId.toString()} index={index} draggableId={JSON.stringify({projectId: task.projectId, taskId: task.taskId})} >
                      {(provided)=>{
                        return  <div 
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        key={index} className="list-group-item" data-toggle="modal" data-target="#infoModal" onClick={()=>{
                          dispatch({type: "GET_TASK_DETAIL_SAGA", taskId: task.taskId})
                        }}>
                        <p className='font-weight-bold'>
                         {task.taskName}
                        </p>
                        <div className="block" style={{display: 'flex'}}>
                          <div className="block-left">
                            <p className='text-danger'>{task.priorityTask.priority}</p>
                          </div>
                          <div className="block-right">
                            <div className="avatar-group" style={{display: 'flex'}}>
                             {task.assigness.map((mem, idx)=>{
                              return  <div className="avatar">
                              <img src={mem.avatar} alt={mem.avatar} />
                            </div>
                             })}
                              
                            </div>
                          </div>
                        </div>
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
    </DragDropContext>
  }
  return <div className="content" style={{display: "flex"}}>
    {renderCardTaskList()}
    
  </div>
}

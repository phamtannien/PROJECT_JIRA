import { Editor } from '@tinymce/tinymce-react'
import React, { useEffect, useState } from 'react'
import { Radio, Select, Space,Slider  } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
const options = [];
for (let i = 10; i < 36; i++) {
  options.push({
    value: i.toString(36) + i,
    label: i.toString(36) + i,
  });
}

export default function FormCreateTask() {
    //lấy dữ liệu từ redux
    const dispatch = useDispatch();
    const arrProject = useSelector(state=>state.projectCyberbugsReducer.arrProject)
    const arrTaskType = useSelector(state=>state.taskTypeReducer.arrTaskType)
    const arrPriority = useSelector(state=>state.priorityReducer.arrPriority)
    useEffect(()=>{
        
        dispatch({
            type:"GET_ALL_PROJECT_SAGA"
        })
        dispatch({
            type:"GET_ALL_TASK_TYPE_SAGA"
        })
        dispatch({
            type:"GET_ALL_PRIORITY_SAGA"
        })
    },[])



    const [size, setSize] = useState('middle');

    const [timeTracking, setTimeTracking]=useState({
        timeTrackingSpent: 0,
        timeTrackingRemaining: 0,
    })

  const handleSizeChange = (e) => {
    setSize(e.target.value);
  };
  const handleChange = (value) => {
    console.log(`Selected: ${value}`);
  };
    const handleEditorChange = (content, editor)=>{

    }
  return (
    
    <div className='container'>
        <div className="form-group">
            <p>Poject</p>
            <select name="projectId" className='form-control' >
                {arrProject?.map((project, idx)=>{
                    return <option key={idx} value={project.id}>{project.projectName}</option>
                })}
            </select>
        </div>
        <div className="form-group">
            <div className="row">
                <div className="col-6">
                    <p>Priority</p>
                    <select name="priorityId" className='form-control' >
                       {arrPriority?.map((priority, idx)=>{
                        return <option key={idx} value={priority.priorityId}>{priority.priority}</option>
                       })}
                    </select>
                </div>
                <div className="col-6">
                    <p>Task type</p>
                    <select name="typeId" className='form-control' >
                        {arrTaskType?.map((taskType, idx)=>{
                            return <option key={idx} value={taskType.id}>{taskType.taskType}</option>
                        })}
                    </select>
                </div>
                
            </div>
           
        </div>
        <div className="form-group">
            <div className="row">
                <div className="col-6">
                    <p>Assignees</p>
                <Select
                    mode="multiple"
                    size={size}
                    placeholder="Please select"
                    defaultValue={['a10', 'c12']}
                    onChange={handleChange}
                    style={{ width: '100%' }}
                    options={options}
                />
                <div className="row mt-3">
                    <div className="col-12">
                        <p>original Estimate</p>
                        <input className='form-control' type='number' min="0" name='originalEstimate' defaultValue="0" height="30"/>
                    </div>
                </div>
                </div>
                <div className="col-6">
                    <p>Time tracking</p>
                <Slider
                    
                    defaultValue={30}
                    value={timeTracking.timeTrackingSpent}
                    max={Number(timeTracking.timeTrackingSpent) + Number(timeTracking.timeTrackingRemaining) }
                />
                <div className="row">
                    <div className="col-6 text-left font-weight-bold">
                        {timeTracking.timeTrackingSpent}h logged
                    </div>
                    <div className="col-6 text-right font-weight-bold">
                        {timeTracking.timeTrackingRemaining}h remaining
                    </div>
                </div>
                <div className="row " style={{marginTop: 5}}>
                    <div className="col-6">
                        <p>Time spent</p>
                        <input className='form-control' defaultValue="0" min="0" type='number' name='timeTrackingSpent' onChange={(e)=>{
                            setTimeTracking({
                                ...timeTracking,
                                timeTrackingSpent: e.target.value
                            })
                        }}/>
                    </div>
                    <div className="col-6">
                        <p>Time remaining</p>
                        <input className='form-control' defaultValue="0" min="0" type='number' name='timeTrackingRemaining' onChange={(e)=>{
                            setTimeTracking({
                                ...timeTracking,
                                timeTrackingRemaining: e.target.value
                            })
                        }}/>
                    </div>
                </div>

                </div>
            </div>
        </div>
        <div className="form-group">
            <p>Description</p>
            <Editor
            name='description123'
            // initialValue={values.description}
            // value={values.description}
            init={{
              height: 500,
              menubar: false,
              plugins: [
                "advlist autolink lists link image charmap print preview anchor",
                "searchreplace visualblocks code fullscreen",
                "insertdatetime media table paste code help wordcount",
              ],
              toolbar:
                "undo redo | formatselect | " +
                "bold italic backcolor | alignleft aligncenter " +
                "alignright alignjustify | bullist numlist outdent indent | " +
                "removeformat | help",
              content_style:
                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
            }}
            onEditorChange={handleEditorChange}
          />
        </div>
    </div>
  )
}

  

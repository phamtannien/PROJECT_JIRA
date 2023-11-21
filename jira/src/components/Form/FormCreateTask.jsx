import { Editor } from '@tinymce/tinymce-react'
import React, { useEffect, useState } from 'react'
import { Radio, Select, Space,Slider  } from 'antd';
import { useDispatch, useSelector, connect } from 'react-redux';
import {withFormik, Form} from "formik";
import * as Yup from 'yup';
import { GET_ALL_PROJECT_SAGA } from '../../constants/projectConstant';
import { GET_ALL_TASK_TYPE_SAGA } from '../../constants/taskTypeConstant';
import { GET_ALL_PRIORITY_SAGA } from '../../constants/priorityConstant';
import { GET_ALL_STATUS_SAGA } from '../../constants/statusContant';
import { SET_SUBMIT_CREATE_TASK } from '../../constants/modalConstant';
import { GET_USER_API } from '../../constants/userConstants';


 function FormCreateTask(props) {
    //lấy dữ liệu từ redux
    const dispatch = useDispatch();
    const arrProject = useSelector(state=>state.projectCyberbugsReducer.arrProject)
    const arrTaskType = useSelector(state=>state.taskTypeReducer.arrTaskType)
    const arrPriority = useSelector(state=>state.priorityReducer.arrPriority)
    const arrUser = useSelector(state=>state.userReducer.arrUser)
    const arrStatus = useSelector(state => state.statusReducer.arrStatus)
   
    
    const userOptions = arrUser?.map((item, idx)=>{
        return {value: item.userId, label:item.name}
    })
    const {
        values,
        touched,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
        setValues,
        setFieldValue
      } = props;
    
    useEffect(()=>{
        
        dispatch({
            type:GET_ALL_PROJECT_SAGA
        })
        dispatch({
            type:GET_ALL_TASK_TYPE_SAGA
        })
        dispatch({
            type:GET_ALL_PRIORITY_SAGA
        })
        dispatch({
            type:GET_ALL_STATUS_SAGA
        })
        dispatch({
            type:SET_SUBMIT_CREATE_TASK,
            submitFunction: handleSubmit
        })
       
        dispatch({type: GET_USER_API, keyWord: ""})
    },[])



    const [size, setSize] = useState('middle');

    const [timeTracking, setTimeTracking]=useState({
        timeTrackingSpent: 0,
        timeTrackingRemaining: 0,
    })

  const handleSizeChange = (e) => {
    setSize(e.target.value);
  };
 
 
  return (
    
    <form className='container' onSubmit={handleSubmit}>
        <div className="form-group">
            <p>Poject</p>
            <select name="projectId" className='form-control' onChange={(e)=>{
              
              let {value} = e.target;
              dispatch({
                type: "GET_USER_BY_PROJECT_ID_SAGA",
                idProject: value
              })
              setFieldValue("projectId", e.target.value)
            }} >
                {arrProject?.map((project, idx)=>{
                    return <option key={idx} value={project.id}>{project.projectName}</option>
                })}
            </select>
        </div>
        <div className="form-group">
            <p>Task name</p>
            <input name='taskName' className='form-control' onChange={handleChange} />
        </div>
        <div className="form-group">
            <p>Status</p>
            <select className='form-control' name="statusId" onChange={handleChange}>
                {arrStatus?.map((stt, idx)=>{
                    return <option key={idx} value={stt.statusId}>{stt.statusName}</option>
                })}
            </select>
        </div>
        <div className="form-group">
            <div className="row">
                <div className="col-6">
                    <p>Priority</p>
                    <select name="priorityId" className='form-control' onChange={handleChange} >
                       {arrPriority?.map((priority, idx)=>{
                        return <option key={idx} value={priority.priorityId}>{priority.priority}</option>
                       })}
                    </select>
                </div>
                <div className="col-6">
                    <p>Task type</p>
                    <select name="typeId" className='form-control' onChange={handleChange} >
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
                    options={userOptions}
                    placeholder="Please select"
                    optionFilterProp='label'
                    onChange={(values)=>{
                        setFieldValue("listUserAsign", values)
                    }}
                    onSelect={(value)=>{
                       
                    }}
                    style={{ width: '100%' }}
                    
                />
                <div className="row mt-3">
                    <div className="col-12">
                        <p>original Estimate</p>
                        <input className='form-control' type='number' min="0" name='originalEstimate' defaultValue="0" height="30" onChange={handleChange}/>
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
                            setFieldValue("timeTrackingSpent",  e.target.value )
                        }}/>
                    </div>
                    <div className="col-6">
                        <p>Time remaining</p>
                        <input className='form-control' defaultValue="0" min="0" type='number' name='timeTrackingRemaining' onChange={(e)=>{
                            setTimeTracking({
                                ...timeTracking,
                                timeTrackingRemaining: e.target.value
                            })
                            setFieldValue("timeTrackingRemaining",  e.target.value )
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
            onEditorChange={ (content, editor)=>{
                setFieldValue("description", content)
            }}
          />
        </div>
        
    </form>
  )
}

  
const formCreateTask = withFormik({
    enableReinitialize:true,
    mapPropsToValues: (props) => { 
        const {arrPriority, arrProject, arrTaskType, arrStatus} = props;

        if(arrProject.length > 0){
            props.dispatch({type:"GET_USER_BY_PROJECT_ID_SAGA", idProject: arrProject[0]?.id})
        }

        
      return {
        listUserAsign: [],
        taskName: "",
        description: "",
        statusId: arrStatus[0]?.statusId,
        originalEstimate: 0,
        timeTrackingSpent: 0,
        timeTrackingRemaining: 0,
        projectId: arrProject[0]?.id,
        typeId: arrTaskType[0]?.id,
        priorityId: arrPriority[0]?.priorityId
      }
  
  },
  
    validationSchema: Yup.object().shape({
    }) ,
  
    handleSubmit: (values, {props, setSubmitting }) => {
        console.log(values);
    props.dispatch({
        type:"CREATE_TASK_SAGA",
        taskObject: values
    })
    },
  
    displayName: 'createTaskForm',
  })(FormCreateTask);
  const mapStateToProps = (state) => {
    return {
        arrProject: state.projectCyberbugsReducer.arrProject,
        arrTaskType: state.taskTypeReducer.arrTaskType,
        arrPriority: state.priorityReducer.arrPriority,
        arrStatus: state.statusReducer.arrStatus,
    }
  }

  
  export default connect (mapStateToProps)(formCreateTask) ;
import React, { useEffect } from 'react'
import { Editor } from "@tinymce/tinymce-react";
import {withFormik, Form} from "formik";
import * as Yup from 'yup';
import { useDispatch , connect, useSelector} from 'react-redux';

 function FormEditProject(props) {
  const arrProjectCategory = useSelector(state=>state.projectCategoryReducer.arrProjectCategory);
  const dispatch = useDispatch();
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


    // const submitForm = (e) => {
    //     e.preventDefault();
    //     alert("submit edit")
    // }
    useEffect(()=>{
      //gọi api category  
      dispatch({type:"GET_ALL_PROJECT_CATEGORY_SAGA"})

        //load sự kiện submit
        dispatch({type: "SET_SUBMIT_EDIT_PROJECT", submitFunction: handleSubmit})
    },[])
   

    const handleEditorChange = (content, editor)=>{
        setFieldValue('description', content)
      }
  return (
    <form className='container-fluid' onSubmit={handleSubmit}>
        <div className="row">
            <div className="col-4">
                <div className="form-group">
                    <p className='font-weight-bold'>Project id</p>
                    <input value={values.id} disabled className='form-control' name='id' />
                </div>
                
            </div>
            <div className="col-4">
            <div className="form-group">
                    <p className='font-weight-bold'>Project name</p>
                    <input value={values.projectName} className='form-control' name='projectName' onChange={handleChange} />
                </div>
                
            </div>
            <div className="col-4">
            <div className="form-group">
                    <p className='font-weight-bold'>Project category</p>
                    <select onChange={handleChange} className='form-control' name="categoryId" value={values.categoryId}>
                        {arrProjectCategory?.map((item, idx)=>{
                          return <option key={idx} value={item.id}>
                            {item.projectCategoryName}
                         </option>
                        })}
                    </select>
                </div>
                
            </div>
            <div className="col-12">
            <div className="form-group">
            <p className='font-weight-bold'>Description</p>
            <Editor
            name='description123'
            initialValue={values.description}
            value={values.description}
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
        </div>
    </form>
  )
}

const editProjectForm = withFormik({
  enableReinitialize:true,
  mapPropsToValues: (props) => { 
    const {projectEdit}= props;
    return {
      id: projectEdit?.id,
      projectName: projectEdit.projectName,
      description: projectEdit.description,
      categoryId: projectEdit.categoryId
    }

},

  validationSchema: Yup.object().shape({
     // email: Yup.string().required("Email is not required").email("email is invalid!"),
      //password: Yup.string().min(6, "password must have min 6 characters").max(32,"password must have max 32 characters" )
  }) ,

  handleSubmit: (values, {props, setSubmitting }) => {
  //user bấm submit => đưa dữ liệu về back end
    const action = {
      type: "UPDATE_PROJECT_SAGA",
      projectUpdate: values
    }
     //call saga
     props.dispatch(action)
     
  },

  displayName: 'editProjectForm',
})(FormEditProject);

const mapStateToProps = (state)=> ({
  
    projectEdit: state.projectReducer.projectEdit
  
})

export default connect (mapStateToProps)(editProjectForm) ;
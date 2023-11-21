import React, { useEffect, useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import {withFormik, Form} from "formik";
import * as Yup from 'yup';
import { connect, useSelector, useDispatch } from "react-redux";
import { GET_ALL_PROJECT_CATEGORY, GET_ALL_PROJECT_CATEGORY_SAGA } from "../../store/types/userSignin";
import { CREATE_PROJECT_SAGA } from "../../constants/projectConstant";


 function CreateProject(props) {
  const dispatch = useDispatch()


  const arrProjectCategory = useSelector(state=>state.projectCategoryReducer.arrProjectCategory);
  
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
    dispatch({type:GET_ALL_PROJECT_CATEGORY_SAGA})
  },[])
  const handleEditorChange = (content, editor)=>{
    setFieldValue('description', content)
  }
  return (
    <div className="container m-5">
      <h3>Create Project</h3>
      <form onChange={handleChange} onSubmit={handleSubmit} className="container">
        <div className="form-group">
          <p>Name</p>
          <input className="form-control" name="projectName" />
        </div>
        <div className="form-group">
          <p>Description</p>
          <Editor
            name='description'
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
        <div className="form-group">
          <select onChange={handleChange} name="categoryId" className="form-control">
           {arrProjectCategory.map((item, index)=>{
            return <option value={item.id} key={index}>{item.projectCategoryName}</option>
           })}
          </select>
        </div>
        <button className="btn btn-outline-primary" type="submit">
          Create Project
        </button>
      </form>
    </div>
  );
}
const createProjectForm = withFormik({
  enableReinitialize:true,
  mapPropsToValues: (props) => { 
   
    return {
      projectName: "",
      description: "",
      categoryId: props.arrProjectCategory[0]?.id
    }

},

  validationSchema: Yup.object().shape({
  }) ,

  handleSubmit: (values, {props, setSubmitting }) => {
   props.dispatch({type:CREATE_PROJECT_SAGA,
  newProject: values
  })
 
     
     
  },

  displayName: 'CreateProjectFormik',
})(CreateProject);

const mapStateToProps = (state)=> ({
  
    arrProjectCategory : state.projectCategoryReducer.arrProjectCategory
  
})

export default connect (mapStateToProps)(createProjectForm) ;

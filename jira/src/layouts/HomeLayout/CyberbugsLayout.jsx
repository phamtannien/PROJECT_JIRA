import React, { useEffect } from "react";
import "../../styles/style.css";

import MainBoard from "../../components/MainBoard";
import HeaderMain from "../../components/HeaderMain";
import InfoMain from "../../components/InfoMain";
import ContentMain from "../../components/ContentMain";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

export default function CyberbugsLayout() {
  const dispatch = useDispatch();
  const params = useParams();
  const projectDetail = useSelector(state => state.projectReducer.projectDetail)

  useEffect(()=>{
    const projectId = params.projectId;
    dispatch({
      type: "GET_PROJECT_DETAIL",
      projectId: projectId
    })
  },[])

  return (
    <div className="main">
      <HeaderMain projectDetail={projectDetail} />

      <InfoMain projectDetail={projectDetail} />

      <ContentMain projectDetail={projectDetail} />
    </div>
  );
}

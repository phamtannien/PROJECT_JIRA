import React from 'react'
import "./styleLoading.css"
import { useSelector } from 'react-redux'

export default function LoadingComponent() {
   const isLoading = useSelector(state => state.loadingReducer.isLoading)
   if(isLoading){
    return (
        <div className='bgLoading'>
            <img src='/assets/imgloading/loading1.gif' alt="" />
        </div>
      )
   }
  else{
    return ""
  }
}

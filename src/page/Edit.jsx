import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { DiaryStateContext } from '../App';
import DiaryEditor from '../components/DiaryEditor';

const Edit = () => {

    const navigate=useNavigate();
    const {id}=useParams();
    // console.log(id)

    const diaryList=useContext(DiaryStateContext)
    // console.log(diaryList)

    //page title 바꾸기
    useEffect(()=>{
        const titleElement =document.getElementsByTagName('title')[0];
        titleElement.innerHTML=`감정 일기장_${id}번 일기 수정`
    },[])

    const [originData,setOriginData]=useState();

    useEffect(()=>{
        if(diaryList.length >= 1){ //일기 데이터가 1개 이상일때 꺼내는거
            const targeyDiary = diaryList.find(
                (it) => parseInt(it.id) === parseInt(id)
            )
            // console.log(targeyDiary)
            //없는 일기를 수정하라고 할 수 없으니까 undefined일때 
            if(targeyDiary){
                setOriginData(targeyDiary)
            }else{
                alert('없는 일기입니다.')
                navigate('/',{replace:true}) //뒤로 가기 못하게 (예를들어 9번 없는데 뒤로가기 누르면 9번으로 못가게 만드는거)
            }
        }  
    },[id,diaryList]) //id나 diaryList가 변할떄만



    return (
        <div>
            {originData && <DiaryEditor isEdit={true} originData={originData}/>}
        </div>
    );
};

export default Edit;
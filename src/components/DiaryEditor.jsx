import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MyHeader from '../components/MyHeader';
import MyButton from '../components/MyButton';
import EmotionItem from './EmotionItem';
import { DiaryDispatchContext } from '../App';
import {getStringDate} from '../util/date'
import { emotionList } from '../util/emotion';



const DiaryEditor = ({isEdit,originData}) => {
    
    const contentRef=useRef();
    const [content,setContent]=useState("");
    const [emotion,setEmotion]=useState(3);
    const [date,setDate]=useState(getStringDate(new Date()));
    
    const {onCreate, onEdit, onRemove}=useContext(DiaryDispatchContext);
    const handleClickEmote = useCallback((emotion) => {
        setEmotion(emotion)
    },[]);

    const navigate=useNavigate();

    const handleSubmit =()=>{
        if(content.length < 1){  
            contentRef.current.focus();
            return;
        }
        if(window.confirm(isEdit ? '일기를 수정하시겠습니까' : '새로운 일기를 작성하시겠습니까')){
            if(!isEdit){
                onCreate(date,content,emotion);
            }else{
                onEdit(originData.id,date,content,emotion)
            }
        }
        navigate('/',{replace:true})  //뒤로가기로 못오게
    }

    const handleRemove=()=>{
        if(window.confirm('정말 삭제하시겠습니까?')){
            onRemove(originData.id)
            navigate('/',{replace:true}) //홈으로 돌려보내기
        }
    }

    //edit에서 {isEdit,originData} props 가져오기
    //수정하면 새로운 일기쓰기가 아니라 기존 일기를 수정해야하니까 originData 유지하도록
    useEffect(()=>{
        if(isEdit){
            setDate(getStringDate(new Date(parseInt(originData.date)))) //날짜
            setEmotion(originData.emotion); //감정
            setContent(originData.content) //내용

        }
    },[isEdit,originData])

    return (
        <div className='DiaryEditor'>
            <MyHeader 
            headText={isEdit ? '일기 수정하기' : '새로운 일기 쓰기'} //isEdit
            leftChild={<MyButton text={'< 뒤로가기'} onClick={()=>navigate(-1)}/>}
            rightChild={
                isEdit && (
                    <MyButton text={'삭제하기'} type={'negative'} onClick={handleRemove}/>
                )
            }
            />
            <div>
                <section>
                    <h4>오늘은 언제인가요?</h4>
                    <div className='input_box'>
                        <input 
                        className='input_date' 
                        value={date} 
                        onChange={(e)=>setDate(e.target.value)} 
                        type="date" />
                    </div>
                </section>
                <section>
                    <h4>오늘의 감정</h4>
                    <div className='input_box emotion_list_wrapper'>
                        {emotionList.map((it)=>(
                            <EmotionItem 
                            key={it.emotion_id}{...it} 
                            onClick={handleClickEmote} 
                            isSelected={it.emotion_id === emotion}/>
                        ))}
                    </div>
                </section>
                <section>
                    <h4>오늘의 일기</h4>
                    <div className='input_box text_wrapper'>
                        <textarea ref={contentRef } value={content} onChange={(e)=>setContent(e.target.value)} placeholder='오늘의 하루는 어땠나요'></textarea>
                    </div>
                </section>
                <section>
                    <div className='control_box'>
                        <MyButton text={'취소하기'} onClick={()=>navigate(-1)} />
                        <MyButton text={'작성완료'} type={'positive'} onClick={handleSubmit} />
                    </div>
                </section>
            </div>
        </div>
    );
};

export default DiaryEditor;
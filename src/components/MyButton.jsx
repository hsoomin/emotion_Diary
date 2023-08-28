import React from 'react';

const MyButton = ({text,type,onClick}) => {

    //버튼 타입 [] 안에 있는 2개 아니면 디폴트
    const btntype=['positive','negative'].includes(type) ? type : 'default' ;

    return (
        <button 
        className={['MyButton',`MyButton_${btntype}`].join(' ') }
        onClick={onClick}>
            {text}
        </button>
    );
};

MyButton.defaultProps={
    type:'default',
};


export default MyButton;
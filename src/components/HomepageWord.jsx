import * as React from 'react';
import '../css/HomepageWord.css';

function HomepageWord() {
    let loginState = localStorage.getItem("loginState");
    if(loginState === null){
        loginState="請先登入或註冊";
    }

    return (
        <>
            <h1 className='typing'>歡迎回來, {loginState}!!</h1>
        </>

    )
}

export default HomepageWord;
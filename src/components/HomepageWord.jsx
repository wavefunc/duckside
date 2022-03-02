import * as React from 'react';
import '../css/HomepageWord.css';

function HomepageWord() {
    let loginState = localStorage.getItem("memberName");
    if (loginState === null) {
        loginState = "請先登入";
    }

    return (
        <>
        <div className='dialog-bottom'>
            <h1 className='typing'>歡迎回來, {loginState}!!</h1>
        </div>
        </>

    )
}

export default HomepageWord;
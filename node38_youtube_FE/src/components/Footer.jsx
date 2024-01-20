import React from 'react'

const Footer = () => {

    const showChat = (show) => {
        document.getElementById("formChat").style.display = show;

    }
    
    return <div>
        <button className="open-button" onClick={() => showChat("block")}><i className="fa fa-comments" aria-hidden="true" /></button>
        <div className="chat-popup" id="formChat">
            <div className="chatHead">
                <p className="chatName">Chat Name</p>
                <button type="button" className="chatClose" aria-label="Close" onClick={() => showChat("none")}><span aria-hidden="true">×</span></button>
            </div>
            <ol className="discussion" id="chat-noiDung">

                <li className="other">
                    <div className="avatar">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHTEFMnih7ZgOPIZej2dclAphUeOhVR1OIFaPoYCOqm9fY1Fv7" />
                    </div>
                    <div className="messages">
                        <p>yeah, they do early flights cause they connect with big airports. they wanna get u to your
                            connection</p>
                        <time dateTime="2009-11-13T20:00">Timothy • 51 min</time>
                    </div>
                </li>
                <li className="self">
                    <div className="avatar">
                        <img src="https://amp.businessinsider.com/images/5947f16889d0e20d5e04b3d9-750-562.jpg" />
                    </div>
                    <div className="messages">
                        <p>That makes sense.</p>
                        <p>It's a pretty small airport.</p>
                        <time dateTime="2009-11-13T20:14">37 mins</time>
                    </div>
                </li>

            </ol>
            <div className="chatBottom">
                <input id="txt-chat" className="sentText" type="text" placeholder="Your Text" style={{ flex: 1, border: '1px solid #0374d8', borderRadius: 20, padding: '0 20px' }} />
                <button id="btn-send" type="button" className="sendbtn" aria-label="Close"><span aria-hidden="true"><i className="fa-regular fa-paper-plane"></i></span></button>
            </div>
        </div>
    </div>

}

export default Footer
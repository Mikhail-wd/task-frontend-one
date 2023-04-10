import React, { useState } from 'react';
import './App.css';

function App() {
  const [name, nameSet] = useState<string>('')
  const [secondName, secondNameSet] = useState<string>('')
  const [mail, mailSet] = useState<string>('')
  const [valueOfText, valueOfTextSet] = useState<string>('blank')
  const [textToSend, textToSendSet] = useState<any>('')
  const [avatarToSend, avatarToSendSet] = useState<any>()

  const [nameError, nameErrorSet] = useState<boolean>()
  const [secondNameError, secondNameErrorSet] = useState<boolean>()
  const [mailError, mailErrorSet] = useState<boolean>()
  const [valueOfTextError, valueOfTextErrorSet] = useState<boolean>()
  const [textError, textErrorSet] = useState<boolean>()
  const [avatarError, avatarErrorSet] = useState<boolean>()

  function nameInputValue(event: any) {
    nameSet(event.target.value)
    nameErrorSet(false)
  }
  function secondNameInputValue(event: any) {
    secondNameSet(event.target.value)
    secondNameErrorSet(false)
  }
  function mailInputValue(event: any) {
    mailSet(event.target.value)
    mailErrorSet(false)
  }

  function selectValue(event: any) {
    if (event.target.value === "develop") {
      valueOfTextSet("develop")
      valueOfTextErrorSet(false)
    } else if (event.target.value === "debug") {
      valueOfTextSet("debug")
      valueOfTextErrorSet(false)
    } else if (event.target.value === "blank") {
      valueOfTextSet("blank")
    }
  }

  function textTosend(event: any) {
    if(textToSend.length < 10) {
      textToSendSet(event.target.value)
      textErrorSet(true)
    } else {
      textToSendSet(event.target.value)
      textErrorSet(false)
    }
  }

  function sendAvatar(event: any) {
    if ((event.target.files[0].size / 2048) > 1000) {
      avatarErrorSet(true)
    } else {
      avatarToSendSet(event.target.files[0])
      avatarErrorSet(false)
    }

  }

  function checkForm() {
    name.length !== 0 ? nameErrorSet(false) : nameErrorSet(true);
    secondName.length !== 0 ? secondNameErrorSet(false) : secondNameErrorSet(true);
    mail.includes("@") ? mailErrorSet(false) : mailErrorSet(true);
    valueOfText !== "blank" ? valueOfTextErrorSet(false) : valueOfTextErrorSet(true)
    textToSend.length > 10 ? textErrorSet(false) : textErrorSet(true)
    avatarToSend !== undefined ? avatarErrorSet(false) : avatarErrorSet(true)

    if (textError === false && nameError === false && secondNameError === false && mailError === false && valueOfTextError === false && avatarError === false) {
      let dataToSend = {
        name: name,
        secondName: secondName,
        email: mail,
        selectedText: valueOfText,
        text: textToSend,
        avatar: avatarToSend
      }
      console.log(JSON.stringify(dataToSend))
    } else {
      alert("Заполните все поля правельно...")
    }
  }

  return (
    <form className="app">
      <label className="name" htmlFor="name">Введите Имя:
        <input type="text" id="name" className={nameError === true ? "error" : ""} placeholder='Обязательно к заполнению' value={name} onChange={nameInputValue} />
      </label>
      <label className="secondName" htmlFor="secondName">Введите Фамилию:
        <input type="text" id="secondName" className={secondNameError === true ? "error" : ""} placeholder='Обязательно к заполнению' value={secondName} onChange={secondNameInputValue} />
      </label>
      <label className="mail" htmlFor="email">Введите email:
        <input type="text" id="email" className={mailError === true ? "error" : ""} placeholder='name@mail.com' value={mail} onChange={mailInputValue} />
      </label>
      <label className="popUp" htmlFor="type-to-enter">Категория:
        <br />
        <select id="type-to-enter" value={valueOfText} className={valueOfTextError === true ? "error" : ""} onChange={selectValue}>
          <option value="develop">Разработка</option>
          <option value="debug">Отладка</option>
          <option value="blank"></option>
        </select>
        <br />
        <label htmlFor="message-text"> Текст сообщения :
          <input id="message-text" type="text" className={textError === true ? "error" : ""} onChange={textTosend} />
        </label>
        <br />
        {textToSend.length === 0 ? <br /> : textToSend.length < 10 ? "Коротковато" : "Уже лучше"}
      </label>
      <label htmlFor="avatar">Картинка не более 2mb:
        <input type="file" id="avatar" className={avatarError === true ? "avatar error" : "avatar"} accept="image/png, image/jpeg" onChange={sendAvatar} />
      </label>
      <button type="button" className='button' onClick={checkForm}>Отправить</button>
    </form>
  );
}

export default App;

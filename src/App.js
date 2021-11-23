import React from 'react';
import { useEffect, useState, useCallback, useRef } from 'react';
import './App.css';

function App() {
  const [html, setHtml] = useState('')
  const passWordRef = useRef()
  const fromRef = useRef()
  const toRef = useRef()
  const ccRef = useRef()
  const subjectRef = useRef()

  const sendTestGmail = useCallback(
    async () => {
      let _emailData = {
        html,
        gmailPassword: passWordRef.current && passWordRef.current.value,
        from: fromRef.current && fromRef.current.value,
        to: toRef.current && toRef.current.value,
        cc: ccRef.current && ccRef.current.value,
        subject: subjectRef.current && subjectRef.current.value
      }
      console.log({_emailData})
      if (
        Object.values(_emailData).every(i => i)
      ) {
        try {
          const res = await fetch(
            '/api/sendGmail',
            {
              body: JSON.stringify(
                _emailData
                // {
                //   gmailPassword: 'uhxoprgookflgxdf',
                //   from: 'chege.qumu@shopee.com',
                //   to: 'chege.qumu@shopee.com',
                //   cc: 'chege.qumu@shopee.com',
                //   subject: 'test5555-------',
                //   html: `
                //     <html>
                //       <body>
                //         <div>99999</div>
                //       </body>
                //     </html>
                //   `
                // }
              ),
              headers: {
                'content-type': 'application/json'
              },
              method: 'POST',
              mode: 'no-cors',
            })
        } catch (err) {
          alert(err)
        }
      }
    },
    [html],
  )
  const onHtmlChange = useCallback((e) => {
    const file = e.target.files[0]
    const reader = new FileReader()
    reader.readAsText(file)
    reader.onload = () => {
      setHtml(reader.result)
    }
  }, [])
  return (
    <main>
      <h3>发送周报</h3>
      <div>
        <input
          ref={passWordRef}
          type='text'
          placeholder='你的谷歌专用密码'
        />
        <span>可在 <a href='https://myaccount.google.com/apppasswords' target="_blank" >这里</a> 设置专用密码</span>
      </div>
      <div>
        <input
          ref={fromRef}
          type='text'
          placeholder='输入发件人邮箱'
        />
      </div>
      <div>
        <input
          ref={toRef}
          type='text'
          placeholder='输入收件人邮箱(多个以,分隔开)'
        />
      </div>
      <div>
        <input
          ref={ccRef}
          type='text'
          placeholder='抄送(多个以,分隔开)'
        />
      </div>
      <div>
        <input
          ref={subjectRef}
          type='text'
          placeholder='邮件标题'
        />
      </div>
      <div>
        <input
          type='file'
          onChange={onHtmlChange}
        />
      </div>
      <button onClick={sendTestGmail}>发送邮件</button>
    </main>
  );
}

export default App;

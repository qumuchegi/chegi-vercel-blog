import React from 'react'
import { useEffect, useState, useCallback, useRef } from 'react'
import {StorageDb} from '@/utils/storage'

export default function ShopeeWeekReportEmail() {
  const [emailInfo, setEmailInfo] = useState<{
    password: string,
    fromEmail: string,
    toEmail: string[],
    ccEmails: string[],
    subject: string,
    htmlStr: string
  }>({
    password: '',
    fromEmail: '',
    toEmail: [],
    ccEmails: [],
    subject: '',
    htmlStr: '' 
  })
  const addToEmailInputRef = useRef<HTMLInputElement>(null)
  const addCCEmailInputRef = useRef<HTMLInputElement>(null)
  const storageRef = useRef<StorageDb>()
  useEffect(() => {
    storageRef.current = new StorageDb('mailTemplate')
    if (storageRef.current) {
      const cache = storageRef.current.get('周报模板')
      try {
        if (cache) {
          const { gmailPassword, from, to, cc, subject } = JSON.parse(cache)
          //setAttribute
          setEmailInfo({
            password: gmailPassword,
            fromEmail: from,
            //@ts-ignore
            toEmail: to.split(',').map(i => i.trim()).filtrt(i => i),
            //@ts-ignore
            ccEmails: cc.split(',').map(i => i.trim()).filtrt(i => i),
            subject,
            htmlStr: ''
          })
        }
      } catch (err) {
        console.error(err)
      }

    }
  }, [])
  const sendTestGmail = useCallback(
    async () => {
      let _emailData = {
        html: emailInfo.htmlStr,
        gmailPassword: emailInfo.password,
        from: emailInfo.fromEmail,
        to: emailInfo.toEmail.join(','),
        cc: emailInfo.ccEmails.join(','),
        subject: emailInfo.subject
      }
      console.log({
        _emailData
      })
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
          const resBody = await res.json()
          if (resBody.code === 0) {
            const {html, ...res} = _emailData
            storageRef.current && storageRef.current.set(
              '周报模板',
              JSON.stringify({
                ...res
              })
            )
            alert('邮件发送成功!')
          }
        } catch (err) {
          alert(err)
        }
      } else {
        alert('你的邮件模板表单未填写完整!')
      }
    },
    [emailInfo],
  )
  const onHtmlChange = useCallback((e) => {
    const file = e.target.files[0]
    const reader = new FileReader()
    reader.readAsText(file)
    reader.onload = () => {
      //@ts-ignore
      setEmailInfo(prev => ({
        ...prev,
        htmlStr: (reader.result)
      }))
    }
  }, [])
  const addToEmail = useCallback((type: 'cc' | 'to') => {
    const value = type === 'cc'
      ? addCCEmailInputRef.current?.value
      : addToEmailInputRef.current?.value
    const willAdd = (value ?? '').trim()
    if (!willAdd) {
      alert('请输入邮件')
    }
    setEmailInfo(prev => ({
      ...prev,
      [
        type === 'cc'
          ? 'ccEmails'
          : 'toEmail'
      ]: [...prev.toEmail, willAdd]
    }))
  }, [])
  return (
    <main>
      <h3>周报邮件模板</h3>
      <div>
        只需一次填写，后面可自动填充( 除了 html 文件)
      </div>
      <div>
        <input
          type='text'
          value={emailInfo.password}
          onChange={(e) => {
            const v = e.target?.value
            setEmailInfo(prev => ({
              ...prev,
              password: v
            }))
          }}
          placeholder='你的谷歌专用密码'
        />
        <span>可在 <a href='https://myaccount.google.com/apppasswords' target="_blank" >这里</a> 设置专用密码</span>
      </div>
      <div>
        <input
          type='text'
          value={emailInfo.fromEmail}
          placeholder='输入发件人邮箱'
          onChange={(e) => {
            const v = e.target?.value
            setEmailInfo(prev => ({
              ...prev,
              fromEmail: v
            }))
          }}
        />
      </div>
      <div>
        <input
          type='text'
          ref={addToEmailInputRef}
          placeholder='输入收件人邮箱'
        />
        <div onClick={() => addToEmail('to')}>
          add
        </div>
        <div>{
            emailInfo.toEmail.map(
              (email, i) => <span key={i}>{email}</span>
            )
          }
          </div>
      </div>
      <div>
        <input
          type='text'
          ref={addCCEmailInputRef}
          placeholder='抄送'
        />
        <div onClick={() => addToEmail('cc')}>
          add
        </div>
        <div>
          {
            emailInfo.ccEmails.map(
              (email, i) => <span key={i}>{email}</span>
            )
          }
        </div>
      </div>
      <div>
        <input
          type='text'
          value={emailInfo.subject}
          placeholder='邮件标题'
          onChange={e => {
            const v = e.target?.value
            setEmailInfo(prev => ({
              ...prev,
              subject:v
            }))
          }}
        />
      </div>
      <div>
        <span>周报 HTML 文件</span>
        <input
          type='file'
          onChange={onHtmlChange}
        />
      </div>
      <button onClick={sendTestGmail}>发送邮件</button>
    </main>
  )
}

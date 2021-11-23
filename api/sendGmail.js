const nodemailer = require('nodemailer')

const sendMail = (
  {
    gmailPassword,
    from,
    to,
    cc,
    subject,
    html
  }
) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: from, //'chege.qumu@shopee.com',
      pass: gmailPassword//'uhxoprgookflgxdf'
    }
  })

  return transporter.sendMail({
    from,
    to,
    cc,
    subject,
    html
  })
}
// sendMail({
//   gmailPassword: 'uhxoprgookflgxdf',
//   from: 'chege.qumu@shopee.com',
//   to: 'chege.qumu@shopee.com',
//   cc: 'chege.qumu@shopee.com',
//   subject: '888',
//   html: '000'
// }).then(() => {
//   console.log(0)
// }).catch(err => {
//   console.log({err})
// })
export default function sendGmail(req, res) {
  // try {
    const {
      gmailPassword,
      from,
      to,
      cc,
      subject,
      html
    } = JSON.parse(req.body)
  // } catch (err) {
    // res.status(200).json({
    //   data: 1,
    //   msg: 'err',
    //   body: req.body
    // })
  // }

  sendMail({
    gmailPassword,//: 'uhxoprgookflgxdf',
    from,//: 'chege.qumu@shopee.com',
    to,//: 'chege.qumu@shopee.com',
    cc,//: 'chege.qumu@shopee.com',
    subject,//: 'test5555',
    html
    //   : `
    //   <html>
    //     <body>
    //       <div>99999</div>
    //     </body>
    //   </html>
    // `
  }).then(() => {
    res.status(200).json({
      data: 0,
      msg: 'success'
    })
  }).catch(err => {
    res.status(200).json({
      data: 1,
      msg: 'success',
      err: err
    })
  })
}


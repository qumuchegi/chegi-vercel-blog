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
      user: from,
      pass: gmailPassword
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

export default function sendGmail(req, res) {
  const {
    gmailPassword,
    from,
    to,
    cc,
    subject,
    html
  } = JSON.parse(req.body)

  sendMail({
    gmailPassword,
    from,
    to,
    cc,
    subject,
    html
  }).then(() => {
    res.status(200).json({
      code: 0,
      msg: 'success'
    })
  }).catch(err => {
    res.status(200).json({
      code: 1,
      msg: 'success',
      err: err
    })
  })
}


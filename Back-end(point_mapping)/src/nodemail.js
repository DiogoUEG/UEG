const mailer = require("nodemailer");

module.exports = (email, nome, mensagem, anexo) => {
    const smtpTransport = mailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, //SSL/TLS
        auth: {
            user: 'testdevmrb27@gmail.com',
            type: "OAuth2",
            clientId: "ufcj2mh7l399f73i57tvdhso6vn31c7u.apps.googleusercontent.com",
            clientSecret: "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",
            refreshToken:"1//04HQAT15BTONiCgYIARAAGAQSNwF-L9Irj6lUkI3Qv0l5hpxVznqUeQIJfxk-nriF7xP0hM7mIj2O-m-UfmM36-VPoolpRHp_zn8",
            accessToken:"ya29.a0AVvZVsqMfp7sT85zUTSQZ1x5fgvICTmkuAeATqr6hoe796EQK7ZuENfFiItHHm-8g_Q7JHQBOf5ULNoqDve1PcBjjZ2ZYdRcMyAswbtPWaQD76hp7RGxKo57IRncmlyhyrVcl_FBk6_ZzTrF1ymwG10da6DfaCgYKAQkSARISFQGbdwaIATTsBm2aOxuX0sfTFO5xrw0163"
        }
    })


    const mail = {
        text: mensagem,
        subject: `${nome} te enviou uma mensagem`,
        from: "testdevmrb27@gmail.com",
        to: email,
        //html: "<b>Opcionalmente, pode enviar como HTML</b>"
    }

    if (anexo) {
        console.log(anexo);
        mail.attachments = [];
        mail.attachments.push({
            filename: anexo.originalname,
            content: anexo.buffer
        })
    }

    async function SendEmail() {
        console.log(mail)
        const mailsend = await smtpTransport.sendMail(mail)
            .then(response => {
                console.log("Enviando ...")
            })
            .catch(error => {
                console.log(error)
            });

        return mailsend
    }

    return new Promise((resolve, reject) => {
        SendEmail()
            .then(response => {
                return resolve(response);
            })
            .catch(error => {
                return reject(error);
            });
    })
}

const mailer = require("nodemailer");
const json2html = require('node-json2html');

module.exports = (email, nome, mensagem) => {
    const smtpTransport = mailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, //SSL/TLS
        auth: {
            user: 'testdevmrb27@gmail.com',
            pass:'test@ueg27',
            type: "OAuth2",
            clientId: "ufcj2mh7l399f73i57tvdhso6vn31c7u.apps.googleusercontent.com",
            clientSecret: "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",
            refreshToken:"1//04rUI4Iovb9NrCgYIARAAGAQSNwF-L9IrCqNgn5PXmu5NjmCnOpYULNH4hEEAyXdwVn6XwA1MebgM__ojqQc8arJ_yCZV1qiExyM",
            accessToken:"ya29.a0AVvZVsps-EAlLTyszoB_ZRMn-I8qmpSr3YgRgGEVz0i6n4TBJJaXCRyHOKLhjL7heIloOf0SVi_XWWBfe-nLTVJIzeTGVbiyBA_mJ62zd3OVlMAkL1AQnPiyryAPPifDszMfrLEqkO0gEdyqLRZqamVTUOUpaCgYKAdoSARISFQGbdwaIDxphP4og5uFvA-t6T8kbbA0163"
        }
    })

    let template_table_header = {
        "<>": "tr", "html": [
            {"<>": "th", "html": "Empresa"},
            {"<>": "th", "html": "Usuário"},
            {"<>": "th", "html": "Data"},
            {"<>": "th", "html": "Hora"},
            {"<>": "th", "html": "Latitudade"},
            {"<>": "th", "html": "Longitude"},
            {"<>": "th", "html": "Tipo"}
        ]
    }
    
    let template_table_body = {
        "<>": "tr", "html": [
            {"<>": "td", "html": "${IdEmpresa}"},
            {"<>": "td", "html": "${IdUsuario}"},
            {"<>": "td", "html": "${data}"},
            {"<>": "td", "html": "${hora}"},
            {"<>": "td", "html": "${lat}"},
            {"<>": "td", "html": "${lng}"},
            {"<>": "td", "html": "${tipo}"}
        ]
    }
    
    function writeHtmlFromScoresJson(jsonFile, htmlTableFile) {
        // let data = fs.readJsonSync(jsonFile);
        let data = jsonFile;
    
        let table_header = json2html.transform(data[0], template_table_header);
        let table_body = json2html.render(data, template_table_body);
    
        let header = '<!DOCTYPE html>' + '<html lang="en">\n' + '<head><title>Lighthouse Report</title></head>'
    let body = '<h1>My Report</h1><br><table id="my_table">\n<thead>' + table_header + '\n</thead>\n<tbody>\n' + table_body + '\n</tbody>\n</table>'
    body = '<body>' + body + '</body>'
    
        let html = header + body + '</html>';
        console.log(html)
        return html
    }
    const mail = {
        text: `Bom dia ${nome}!, Segue o relatorio:`,
        subject: `${nome} te enviou uma mensagem`,
        from: "testdevmrb27@gmail.com",
        to: "testdevmrb27@gmail.com",
        html: writeHtmlFromScoresJson(mensagem, 'outfile.html')
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

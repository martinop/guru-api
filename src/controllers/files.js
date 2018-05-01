import { IncomingForm } from 'formidable'
import helpers from '../helpers'
const { db } = helpers

const post = (req, res) => {
    const form = IncomingForm()
    form.keepExtensions = true
    form.uploadDir = './uploads/'

    form.parse(req, (err, fields, files) => {
        const description = fields.description
        const id_subject = fields.id_subject
        const id_user = fields.id_user
        db.connect().then((obj) => {
            obj.one('INSERT INTO files(id_user, id_subject, path, created_at, description) VALUES($1, $2, $3, $4, $5) RETURNING id_file', [id_user, id_subject, files.file.path, new Date(), description ])
                .then((data) => {
                    res.send({ status: 200, message: 'File created', data })
                    obj.done()           
                })
                .catch((error) => {
                    console.log(error)
                    res.send({ status: 500, error })
                    obj.done()    
                })
            }).catch((error) => {
                res.status(500).send({ status: 500, error });
            })
    })
}

export default { post }
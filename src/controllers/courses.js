import helpers from '../helpers'
const { db } = helpers

const get = (req, res) => {
    db.connect().then((obj) => {
        obj.any('SELECT subjects_users.id_subject, subject_name FROM subjects_users INNER JOIN subject ON (subject.id_subject = subjects_users.id_subject) WHERE id_user = $1', [req.params.userId])
            .then((data)=> {
                res.send({ status: 200, data })
                obj.done()           
            })
            .catch((error)=>{
                res.send({ status: 500, error })
                obj.done()    
            })
    }).catch((error)=> {
        res.status(500).send({ status: 500, error });
    })
}
const getData = (req, res) => {
    db.connect().then((obj) =>{
        const messages = obj.any('SELECT user_1.id_user, user_1.username, created_at, message from messages INNER JOIN user_1 ON (user_1.id_user = messages.id_user) WHERE id_subject = $1', [req.params.courseId])
        const files =  obj.any('SELECT user_1.id_user, user_1.username, path, created_at, description from files INNER JOIN user_1 ON (user_1.id_user = files.id_user) WHERE id_subject = $1', [req.params.courseId])
        Promise.all([messages, files]).then((data)=> {
            console.log(data)
            res.send({ status: 200, data: {messages: data[0], files: data[1]} })
            obj.done()           
        })
        .catch((error) =>{
            res.send({ status: 500, error })
            obj.done()    
        })
    }).catch((error) => {
        res.status(500).send({ status: 500, error });
    })
}

export default { get, getData}
import helpers from '../helpers'
const { db } = helpers

const post = (req, res) => {
    db.connect().then((obj)=>{
        const { message, id_subject, id_user } = req.body
        obj.none('INSERT INTO messages(created_at, message, id_subject, id_user) VALUES($1, $2, $3, $4)', [new Date(), message, id_subject, id_user])
            .then((data) => {
                res.send({ status: 200, message: 'Message created' })
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

export default { post }
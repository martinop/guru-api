import express from 'express'
import messages from './messages'
import courses from './courses'
import files from './files'
const router = express.Router()

router.get('/', (req, res) => {
    res.send('Welcome!')
})

router.use('/courses', courses)
router.use('/messages', messages)
router.use('/files', files)

export default router
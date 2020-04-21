import express from "express"

const router = express.Router();

/* GET history home page. */
router.get('/', function (req, res) {
    res.send({route: "history home"});
});

export default router;
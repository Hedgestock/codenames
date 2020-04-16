import express from "express"

const router = express.Router();

/* GET api home page. */
router.get('/', function (req, res) {
    res.send({route: "api home"});
});

export default router;
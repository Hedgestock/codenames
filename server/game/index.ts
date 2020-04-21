import express from "express"

const router = express.Router();

/* GET game home page. */
router.get('/', function (req, res) {
    res.send({route: "game home"});
});

export default router;
const express = require("express")
const router = express()

//test route

router.get("/", (req, res) => {
    res.send("Api Working!")
})

module.exports = router 
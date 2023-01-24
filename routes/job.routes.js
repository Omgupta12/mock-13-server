const express = require("express")
const JobModel = require("../model/job.model")
const app = express.Router()

app.get("/list", async (req, res) => {
    try {
        const alljobs = await JobModel.find()
        console.log(alljobs)
        return res.status(201).send(alljobs)
    }
    catch (e) {
        console.log("err", e)
        return res.send({ message: e.message })
    }
})

app.post("/post", async (req, res) => {
    const { name, position, contract, location } = req.body
    try {
        const postjob = new JobModel({ name, position, contract, location })
        await postjob.save()
        return res.status(201).send(postjob)
    }
    catch (e) {
        console.log("err", e)
        return res.send({ message: e.message })
    }
})

app.patch("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const changes = req.body;

        const job = await JobModel.findByIdAndUpdate(id, changes, { new: true });
        res.status(200).send(job);
    }
    catch (err) {
        res.status(500).send({ message: err.message });
    }
})

app.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params
        await JobModel.findByIdAndDelete(id);
        res.status(200).send('job deleted');
    }
    catch (err) {
        res.status(500).send({ message: err.message });
    }
})

module.exports = app
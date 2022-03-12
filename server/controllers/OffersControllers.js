import { validationResult } from "express-validator"
import House from "../models/House.js"
import fs from "fs";

const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

class adminController {

    async UploadPhoto(req, res) {
        fs.writeFile(
            `images/${req.body.name}.jpg`,
            Buffer.from(req.body.image, "base64"),
            (err) => {
                if (err) throw err;
                console.log("It's saved!");
            }
        );
        res.send(`images/${req.body.name}.jpg`);
    }

    async AddHouse(req, res) {
        try {
            const validateErrors = validationResult(req)
            let errorsMsg = ""

            validateErrors.errors.map(err => errorsMsg ? errorsMsg += ", " + err.msg.toLowerCase() : errorsMsg += err.msg.toLowerCase())

            if (!validateErrors.isEmpty()) return res.status(400).json({ message: capitalizeFirstLetter(errorsMsg) })

            const { image, name, description, rentCost, saleCost } = req.body;

            if (saleCost.length === 0 & rentCost.length === 0) return res.status(400).json({ message: "You need to put one of two: rent price or sale price" })

            const house = new House({ image, name, description, rentCost, saleCost })
            house.save()

            return res.json({ message: "House offer was created!" })
        }
        catch (e) {
            console.log(e)
            res.status(400).json({ message: "Add House error" })
        }
    }

    async RemoveHouse(req, res) {
        try {
            const { _id } = req.body
            const house = await House.findOne({ _id })

            if (!house) return res.status(400).json({ message: "Offer not exist!" })

            house.remove()

            return res.json({ message: "House offer was removed!" })
        }
        catch (e) {
            console.log(e)
            res.status(400).json({ message: "Remove House error" })
        }
    }

    async GetHouses(req, res) {
        try {
            const houses = await House.find()
            res.json(houses)
        }
        catch (e) {
            console.log(e)
            res.status(400).json({ message: "Add House error" })
        }
    }
}

export default new adminController()

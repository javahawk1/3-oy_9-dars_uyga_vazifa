const pool = require("../config/db.js")

const GetWater_products = (req, res) => {
    pool.query("SELECT * FROM water_products", (err, result) => {
        if (err) {
            console.log("Suv mahsulotlarini olishda xatolik:", err)
            return res.status(500).send({ message: "Serverda xatolik yuz berdi" })
        }
        console.log(result.rows)
        res.status(200).send({
            message: "Barcha suv mahsulotlari olindi",
            data: result.rows
        })
    })
}

const GetOneWater_product = (req, res) => {
    const { id } = req.params
    pool.query("SELECT * FROM water_products WHERE id=$1", [id], (err, result) => {
        if (err) {
            console.log("Suv mahsulotini olishda xatolik:", err)
            return res.status(500).send({ message: "Serverda xatolik yuz berdi" })
        }
        res.status(200).send({
            message: "Suv mahsuloti ma'lumotlari olindi",
            data: result.rows
        })
    })
}

const AddWater_product = (req, res) => {
    const { name, volume_liters, price } = req.body
    pool.query(
        "INSERT INTO water_products (name, volume_liters, price) VALUES ($1, $2, $3) RETURNING *",
        [name, volume_liters, price],
        (err, result) => {
            if (err) {
                console.log("Yangi suv mahsulotini qoshishda xatolik:", err)
                return res.status(500).send({ message: "Serverda xatolik yuz berdi" })
            }
            console.log(result.rows[0])
            res.status(201).send({
                message: "Yangi suv mahsuloti muvaffaqiyatli qoshildi",
                data: result.rows[0]
            })
        }
    )
}

const PatchWater_product = (req, res) => {
    const { id } = req.params
    const { name, volume_liters, price } = req.body
    pool.query(
        "UPDATE water_products SET name=$1, volume_liters=$2, price=$3 WHERE id=$4 RETURNING *",
        [name, volume_liters, price, id],
        (err, result) => {
            if (err) {
                console.log("Suv mahsulotini yangilashda xatolik:", err)
                return res.status(500).send({ message: "Serverda xatolik yuz berdi" })
            }
            res.status(200).send({
                message: "Suv mahsuloti ma'lumotlari yangilandi",
                data: result.rows[0]
            })
        }
    )
}

const DeleteWater_product = (req, res) => {
    const { id } = req.params
    pool.query(
        "DELETE FROM water_products WHERE id=$1 RETURNING *",
        [id],
        (err, result) => {
            if (err) {
                console.log("Suv mahsulotini ochirishda xatolik:", err)
                return res.status(500).send({ message: "Serverda xatolik yuz berdi" })
            }
            res.status(200).send({
                message: "Suv mahsuloti muvaffaqiyatli ochirildi",
                data: result.rows[0]
            })
        }
    )
}

module.exports = {
    GetWater_products,
    GetOneWater_product,
    AddWater_product,
    PatchWater_product,
    DeleteWater_product
}

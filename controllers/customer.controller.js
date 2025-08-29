const pool = require("../config/db.js")

const getCustomers = (req, res) => {
    pool.query("SELECT * FROM customers", (err, result) => {
        if (err) {
            console.log("Mijozlarni olishda xatolik:", err)
            return res.status(500).send({ message: "Serverda xatolik yuz berdi" })
        }
        console.log(result.rows)
        res.status(200).send({
            message: "Barcha mijozlar olindi",
            data: result.rows
        })
    })
}

const getOneCustomer = (req, res) => {
    const { id } = req.params
    pool.query("SELECT * FROM customers WHERE id = $1", [id], (err, result) => {
        if (err) {
            console.log("Mijozni olishda xatolik:", err)
            return res.status(500).send({ message: "Serverda xatolik yuz berdi" })
        }
        res.status(200).send({
            message: "Mijoz ma'lumotlari olindi",
            data: result.rows
        })
    })
}

const addCustomer = (req, res) => {
    const { name, phone, email } = req.body
    pool.query(
        "INSERT INTO customers (name, phone, email) VALUES ($1, $2, $3) RETURNING *",
        [name, phone, email],
        (err, result) => {
            if (err) {
                console.log("Yangi mijoz qoshishda xatolik:", err)
                return res.status(500).send({ message: "Serverda xatolik yuz berdi" })
            }
            res.status(201).send({
                message: "Yangi mijoz muvaffaqiyatli qoshildi",
                data: result.rows[0]
            })
        }
    )
}

const patchCustomer = (req, res) => {
    const { id } = req.params
    const { name, phone, email } = req.body
    pool.query(
        "UPDATE customers SET name=$1, phone=$2, email=$3 WHERE id=$4 RETURNING *",
        [name, phone, email, id],
        (err, result) => {
            if (err) {
                console.log("Mijozni yangilashda xatolik:", err)
                return res.status(500).send({ message: "Serverda xatolik yuz berdi" })
            }
            res.status(200).send({
                message: "Mijoz ma'lumotlari yangilandi",
                data: result.rows[0]
            })
        }
    )
}

const deleteCustomer = (req, res) => {
    const { id } = req.params
    pool.query(
        "DELETE FROM customers WHERE id=$1 RETURNING *",
        [id],
        (err, result) => {
            if (err) {
                console.log("Mijozni ochirishda xatolik:", err)
                return res.status(500).send({ message: "Serverda xatolik yuz berdi" })
            }
            res.status(200).send({
                message: "Mijoz muvaffaqiyatli ochirildi",
                data: result.rows[0]
            })
        }
    )
}

module.exports = {
    getCustomers,
    getOneCustomer,
    addCustomer,
    patchCustomer,
    deleteCustomer
}

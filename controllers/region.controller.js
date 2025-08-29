const pool = require("../config/db.js");

const GetRegions = (req, res) => {
    pool.query("SELECT * FROM regions", (err, result) => {
        if (err) {
            console.log("Regionlarni olishda xatolik:", err);
            return res.status(500).send({ message: "Serverda xatolik yuz berdi" });
        }
        console.log(result.rows);
        res.status(200).send({
            message: "Barcha regionlar olindi",
            data: result.rows
        });
    });
};

const GetOneRegion = (req, res) => {
    const { id } = req.params;
    pool.query("SELECT * FROM regions WHERE id = $1", [id], (err, result) => {
        if (err) {
            console.log("Regionni olishda xatolik:", err);
            return res.status(500).send({ message: "Serverda xatolik yuz berdi" });
        }
        res.status(200).send({
            message: "Region ma'lumotlari olindi",
            data: result.rows
        });
    });
};

const AddRegion = (req, res) => {
    const { name } = req.body;
    pool.query(
        "INSERT INTO regions (name) VALUES ($1) RETURNING *",
        [name],
        (err, result) => {
            if (err) {
                console.log("Yangi region qo‘shishda xatolik:", err);
                return res.status(500).send({ message: "Serverda xatolik yuz berdi" });
            }
            console.log(result.rows[0]);
            res.status(201).send({
                message: "Yangi region muvaffaqiyatli qo‘shildi",
                data: result.rows[0]
            });
        }
    );
};

const PatchRegion = (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    pool.query(
        "UPDATE regions SET name=$1 WHERE id=$2 RETURNING *",
        [name, id],
        (err, result) => {
            if (err) {
                console.log("Regionni yangilashda xatolik:", err);
                return res.status(500).send({ message: "Serverda xatolik yuz berdi" });
            }
            res.status(200).send({
                message: "Region ma'lumotlari yangilandi",
                data: result.rows[0]
            });
        }
    );
};

const DeleteRegion = (req, res) => {
    const { id } = req.params;
    pool.query(
        "DELETE FROM regions WHERE id=$1 RETURNING *",
        [id],
        (err, result) => {
            if (err) {
                console.log("Regionni o‘chirishda xatolik:", err);
                return res.status(500).send({ message: "Serverda xatolik yuz berdi" });
            }
            res.status(200).send({
                message: "Region muvaffaqiyatli o‘chirildi",
                data: result.rows[0]
            });
        }
    );
};

module.exports = {
    GetRegions,
    GetOneRegion,
    AddRegion,
    PatchRegion,
    DeleteRegion
};

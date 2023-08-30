const express = require("express");
const gameDataController = express.Router();
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

gameDataController.get("/", async (req, res) => {
    try {
        const allGameData = await prisma.gamedata.findMany({
            orderBy:{session_start:'asc'},
        });
        res.status(200).json(allGameData);
        await prisma.$disconnect()
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
        await prisma.$disconnect()
        process.exit(1)
    }
});

//Creat new data
//post username and pw in the data object {data:{username:something,pw:something}}
gameDataController.post("/", async (req, res) => {
    console.log(req.body.data)
    try {
        const gameData = await prisma.gamedata.create({
            data: req.body.data
        });
        res.status(200).json({
            message: 'sussece',
            data: gameData
        });
        await prisma.$disconnect()
    } catch (error) {
        console.log(error)
        res.status(500).json(error);
        await prisma.$disconnect()
        process.exit(1)
    }
});

//Edit existing Data
//update username and pw in the data object 
// {
//   session_id:something,
//   data:{username:something,pw:something}
//}
gameDataController.put("/", async (req, res) => {
    console.log(req.body)
    try {
        const gameData = await prisma.gamedata.update({
            where: {session_id: req.body.session_id},
            data: req.body.data
        });
        res.status(200).json({
            message: 'sussece',
            data: gameData
        });
        await prisma.$disconnect()
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
        await prisma.$disconnect()
        process.exit(1)
    }
});

gameDataController.delete("/", async (req, res) => {
    try {
        const deleteGameData = await prisma.gamedata.delete({
            where:{session_id: req.body.session_id}
        })
        res.status(200).json({
            message: 'sussece',
            delete: deleteGameData
        });
        await prisma.$disconnect()
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
        await prisma.$disconnect()
        process.exit(1)
    }
})

module.exports = gameDataController
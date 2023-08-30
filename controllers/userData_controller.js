const express = require("express");
const userDataController = express.Router();
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

userDataController.get("/", async (req, res) => {
  try {
    const allUsers = await prisma.userdata.findMany({
      orderBy:{user_id:'asc'},
    });
    res.status(200).json(allUsers);
    await prisma.$disconnect()
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
    await prisma.$disconnect()
    process.exit(1)
  }
});

//check username and password(pw) are in the database
//try to fetch like https:localhost:3001/username?pw=something
userDataController.get('/:username',async (req,res) => {
    try {
        const founduser = await prisma.userdata.findMany({
          where: {
            username: req.params.username,
            pw:req.query.pw
          }
        })
        if(founduser.length){
          res.status(200).json(founduser)
        }else{
          console.log('not found')
          res.status(404).json({
            message: 'User not found'
          })
        }
        await prisma.$disconnect()
    } catch (error) {
        res.states(500).json(error)
        await prisma.$disconnect()
        process.exit(1)
    }
})


//Creat new data
//post username and pw in the data object {data:{username:something,pw:something}}
userDataController.post("/", async (req, res) => {
  const { username } = req.body.data
  const { pw } = req.body.data
  try {
    const allUsers = await prisma.userdata.create({
      data:{
        username:username,
        pw:pw
      }
    });
    res.status(200).json({
      message:'sussece',
      data: allUsers
    });
    await prisma.$disconnect()
  } catch (error) {
    if (error.code === "P2002") {
      res.status(500).json({
        message:'Please try different User ID'
      });
    }else{
      res.status(500).json(error);
    }
    await prisma.$disconnect()
  }
});

//Edit existing Data
//update username and pw in the data object 
// {
//   user_id:something,
//   data:{username:something,pw:something}
//}
userDataController.put("/", async (req, res) => {
  console.log(req.body)
  try {
    const allUsers = await prisma.userdata.update({
      where:{user_id:req.body.user_id},
      data:req.body.data
    });
    console.log(allUsers);
    res.status(200).json({
      message:'sussece',
      data: allUsers
    });
    await prisma.$disconnect()
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
    await prisma.$disconnect()
    process.exit(1)
  }
});

userDataController.delete("/", async (req, res) => {
  try {
    const deletegame = await prisma.gamedata.deleteMany({
      where:{user_id: req.body.user_id}
    })
      const deleteGameData = await prisma.userdata.delete({
          where:{user_id: req.body.user_id}
      })
      res.status(200).json({
          message: 'sussece',
          delete: deleteGameData,
          data:deletegame
      });
      await prisma.$disconnect()
  } catch (error) {
      console.log(error);
      res.status(500).json(error);
      await prisma.$disconnect()
      process.exit(1)
  }
})

module.exports = userDataController;

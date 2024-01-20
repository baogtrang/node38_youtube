import sequelize from "../models/connect.js";
import initModels from "../models/init-models.js";
import { Sequelize } from "sequelize";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const Op = Sequelize.Op;
const conn = initModels(sequelize);

const getVideo = async (req, res) => {
  let { videoName } = req.query; // optional
  // pagination
  let { page, size } = req.params;
  let pageNum = Number(page);
  let sizeNum = Number(size);
  // index: the starting position of the query
  let index = (pageNum - 1) * sizeNum;

  try {
    // using SEQUELIZE
    // if (!videoName) {
    //   videoName = "";
    // }
    // let data = await conn.video.findAll({
    //   where: {
    //     video_name: {
    //       [Op.like]: `%${videoName}%`,
    //     },
    //   },
    //   limit: sizeNum,
    //   offset: index,
    // });

    //using PRISMA here
    let data = await prisma.video.findMany({
      // where: {
      //   // video_id: 1,
      //   // video_name: {
      //   //   contains: videoName,
      //   // },
      // }
      skip: index,
      take: sizeNum,
    });

    res.send(data);
  } catch (error) {
    res.send(`Error: ${error}`);
  }
};

// expressjs route handler function to create a new video record in the DB
const createVideo = async (req, res) => {
  try {
    let { video_name, description, user_id, type_id } = req.body;
    let newData = { video_name, description, user_id, type_id };
    // await conn.video.create(newData);
    await prisma.video.create({
      data: newData,
    });
    res.send("Creating video is successful");
  } catch (error) {
    res.send(`Error: ${error}`);
  }
};

const deleteVideo = async (req, res) => {
  try {
    let { videoId } = req.params;
    await conn.video.destroy({
      where: {
        video_id: videoId,
      },
    });
    res.send("Deleting video is successful!");
  } catch (error) {
    res.send(`Error: ${error}`);
  }
};

const updateVideo = async (req, res) => {
  try {
    let { videoId } = req.params;
    let { video_name, description, user_id, type_id } = req.body;
    let updatedData = { video_name, description, user_id, type_id };
    await conn.video.update(updatedData, {
      where: {
        video_id: videoId,
      },
    });
    res.send("Updating video is successful");
  } catch (error) {
    res.send(`Error: ${error}`);
  }
};

export { getVideo, createVideo, deleteVideo, updateVideo };

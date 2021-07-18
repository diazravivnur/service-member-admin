const { content } = require("../../../models");

exports.createContent = async (req, res) => {
  try {
    const image = req.files.imageFile[0].filename;
    const path = process.env.PATH_KEY_CONTENT;
    const dataContent = await content.create({
      ...req.body,
      image : path + image
    });
    res.status(200).send({
      status: "success",
      data: { 
        content : dataContent 
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "server error",
    });
  }
};

exports.getContents = async (req, res) => {
  try {
    let dataContents = await content.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    res.status(200).send({
      status: "success",
      data: { content: dataContents },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "server error",
    });
  }
};

exports.getContentDetail = async (req, res) => {
  const { id } = req.params;

  try {
    const dataContent = await content.findOne({
      where: {
        id,
      },

      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    if (!dataContent) {
      return res.send({
        status: "failed",
        message: "data not found",
      });
    }

    res.status(200).send({
      status: "success",
      data: { content: dataContent },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "server error",
    });
  }
};

exports.updateContent = async (req, res) => {
  try {
    const { id } = req.params;
    //check content
    const image = req.files.imageFile[0].filename;
    const path = process.env.PATH_KEY_CONTENT;
    const getContent = await content.findOne({
      where: {
        id,
      },
    });
    if (!getContent) {
      return res.status(400).send({
        status: "failed",
        message: "user not found",
      });
    }
    //edit content
    getData = {
      ...req.body,
      image :path + image
    };
    const update = await content.update(getData, {
      where: { id },
    });
    res.send({
      status: "success",
      data: {
        content: getData,
      },
    });
  } catch (error) {
    res.status({
      status: "error",
      message: "server error",
    });
  }
};

exports.deleteContent = async (req, res) => {
  try {
    const id = req.params.id;

    const findContent = await content.findOne({ where: { id } });

    if (!findContent) {
      return res.send({
        status: "failed",
        message: "Data not found",
      });
    }
    await content.destroy({ where: { id } });

    res.status(200).send({
      status: "success",
      data: { id: findContent.id },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "server error",
    });
  }
};

const { paket } = require("../../models");

exports.createPaket = async (req, res) => {
  try {
    const dataPaket = await paket.create({
      ...req.body,
      include: [
        {
          model: paket,
          as: "paket",
        },
      ],
    });

    res.status(200).send({
      status: "success",
      data: { paket: dataPaket },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "server error",
    });
  }
};

exports.getPakets = async (req, res) => {
  try {
    let dataPakets = await paket.findAll({});

    res.status(200).send({
      status: "success",
      data: { paket: dataPakets },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "server error",
    });
  }
};

exports.getPaketDetail = async (req, res) => {
  const { id } = req.params;

  try {
    const dataPaket = await paket.findOne({
      where: {
        id,
      },
    });

    if (!dataPaket) {
      return res.send({
        status: "failed",
        message: "data not found",
      });
    }

    res.status(200).send({
      status: "success",
      data: { paket: dataPaket },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "server error",
    });
  }
};

exports.updatePaket = async (req, res) => {
  try {
    const { id } = req.params;
    //check Paket
    const getPaket = await paket.findOne({
      where: {
        id,
      },
    });
    if (!getPaket) {
      return res.status(400).send({
        status: "failed",
        message: "user not found",
      });
    }
    //edit paket
    getData = {
      ...req.body,
      id,
    };
    const update = await paket.update(getData, {
      where: { id },
    });
    res.send({
      status: "success",
      data: {
        paket: getData,
      },
    });
  } catch (error) {
    res.status({
      status: "error",
      message: "server error",
    });
  }
};

exports.deletePaket = async (req, res) => {
  try {
    const id = req.params.id;

    const findPaket = await paket.findOne({ where: { id } });

    if (!findPaket) {
      return res.send({
        status: "failed",
        message: "Data not found",
      });
    }

    await paket.destroy({ where: { id } });

    res.status(200).send({
      status: "success",
      data: { id: findPaket.id },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "server error",
    });
  }
};

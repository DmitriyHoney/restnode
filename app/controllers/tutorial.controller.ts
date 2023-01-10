const db = require("../models/index");
const Tutorial = db.tutorials;

exports.create = (req: any, res: any) => {
    // Validate request
    if (!req.body.title) {
      res.status(400).send({ message: "Content can not be empty!" });
      return;
    }
  
    // Create a Tutorial
    const tutorial = new Tutorial({
      title: req.body.title,
      description: req.body.description,
      published: req.body.published ? req.body.published : false
    });
  
    // Save Tutorial in the database
    tutorial
      .save(tutorial)
      .then((data: any) => {
        res.send(data);
      })
      .catch((err: any) => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Tutorial."
        });
      });
  };

  exports.findAll = (req: any, res: any) => {
    const title = req.query.title;
    var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};
  
    Tutorial.find(condition)
      .then((data: any) => {
        res.send(data);
      })
      .catch((err: any) => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tutorials."
        });
      });
  };


  exports.findOne = (req: any, res: any) => {
    const id = req.params.id;
  
    Tutorial.findById(id)
      .then((data: any) => {
        if (!data)
          res.status(404).send({ message: "Not found Tutorial with id " + id });
        else res.send(data);
      })
      .catch((err: any) => {
        res
          .status(500)
          .send({ message: "Error retrieving Tutorial with id=" + id });
      });
  };

  exports.update = (req: any, res: any) => {
    if (!req.body) {
      return res.status(400).send({
        message: "Data to update can not be empty!"
      });
    }
  
    const id = req.params.id;
  
    Tutorial.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then((data: any) => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found!`
          });
        } else res.send({ message: "Tutorial was updated successfully." });
      })
      .catch((err: any) => {
        res.status(500).send({
          message: "Error updating Tutorial with id=" + id
        });
      });
  };

  exports.delete = (req: any, res: any) => {
    const id = req.params.id;
  
    Tutorial.findByIdAndRemove(id)
      .then((data: any) => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`
          });
        } else {
          res.send({
            message: "Tutorial was deleted successfully!"
          });
        }
      })
      .catch((err: any)=> {
        res.status(500).send({
          message: "Could not delete Tutorial with id=" + id
        });
      });
  };

  exports.deleteAll = (req: any, res: any) => {
    Tutorial.deleteMany({})
      .then((data: any) => {
        res.send({
          message: `${data.deletedCount} Tutorials were deleted successfully!`
        });
      })
      .catch((err: any) => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all tutorials."
        });
      });
  };


  exports.findAllPublished = (req: any, res: any) => {
    Tutorial.find({ published: true })
      .then((data: any) => {
        res.send(data);
      })
      .catch((err: any) => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tutorials."
        });
      });
  };
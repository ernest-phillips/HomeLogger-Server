const express = require("express");
const Joi = require("joi");
const { HTTP_STATUS_CODES } = require("../config");
const { Passage, PassageJoiSchema } = require("./passage.model");

const passageRouter = express.Router();

//Create new passage
//using /api/passages

passageRouter.get("/", (req, res, next) => {
  Passage.find()
    .then(passages => {
      return res
        .status(HTTP_STATUS_CODES.OK)
        .json(passages.map(passage => passage.serialize()));
    })
    .catch(error => {
      return res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).send(error);
    });
});
passageRouter.get("/:id", (req, res, next) => {
  const id = req.params.id;
  Passage.findById(id)
    .then(passage => {
      return res.status(HTTP_STATUS_CODES.OK).json(passage.serialize());
    })
    .catch(error => {
      return res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json(error);
    });
});

passageRouter.post("/", (req, res, next) => {
  const newPassage = {
    author: req.body.author,
    body: req.body.body,
    votes: req.body.votes
  };

  const validation = Joi.validate(newPassage, PassageJoiSchema);
  if (validation.error) {
    return res.status(HTTP_STATUS_CODES.BAD_REQUEST).json({
      error: validation.error
    });
  }
  Passage.create(newPassage)
    .then(createdPassage => {
      return res
        .status(HTTP_STATUS_CODES.CREATED)
        .json(createdPassage.serialize());
    })
    .catch(error => {
      return res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json({
        error: error.message
      });
    });
});
passageRouter.put("/:id");
passageRouter.delete("/:id");

module.exports = { passageRouter };

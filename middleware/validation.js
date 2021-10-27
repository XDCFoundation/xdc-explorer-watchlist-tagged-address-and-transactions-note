import Utils from "../app/utils";
import * as yup from "yup";

module.exports = {
  validateUserLogin: async (req, res, next) => {
    const schema = yup.object().shape({
      email: yup.string().email(),
      password: yup.string().min(8).required(),
    });
    await validate(schema, req.body, res, next);
  },
  validateTransactionLable: async (req, res, next) => {
    const schema = yup.object().shape({
      userId: yup.string().required(),
      trxLable: yup.string().required(),
      transactionHash: yup.string().required(),
    });
    await validate(schema, req.body, res, next);
  },
  validateGetTransactionLable: async (req, res, next) => {
    const schema = yup.object().shape({
      UserId: yup.string().required(),
    });
    await validate(schema, req.body, res, next);
  },
  validateTagAddressLable: async (req, res, next) => {
    const schema = yup.object().shape({
      _id: yup.string().required(),
      address: yup.string().required(),
      tagName: yup.string().required(),
    });
    await validate(schema, req.body, res, next);
  },
  validateUserAddress: async (req, res, next) => {
    const schema = yup.object().shape({
      userId: yup.string().required(),
      address: yup.string().required(),
    });
    await validate(schema, req.body, res, next);
  },
  validateWatchList: async (req, res, next) => {
    const schema = yup.object().shape({
      _id: yup.string().required(),
      address: yup.string().required(),
      description: yup.string().required(),
    });
    await validate(schema, req.body, res, next);
  },
  validateEditTransactionPrivateNote: async (req, res, next) => {
    const schema = yup.object().shape({
      _id: yup.string().required(),
      trxLable: yup.string(),
      transactionHash: yup.string(),
    });
    await validate(schema, req.body, res, next);
  },
};

const validate = async (schema, reqData, res, next) => {
  try {
    await schema.validate(reqData, { abortEarly: false });
    next();
  } catch (e) {
    const errors = e.inner.map(({ path, message, value }) => ({
      path,
      message,
      value,
    }));
    Utils.responseForValidation(res, errors);
  }
};

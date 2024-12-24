const Joi = require('joi');
const { result } = require('lodash');
Joi.objectId = require('joi-objectid')(Joi)
const mongoose = require('mongoose');
    

const registorValidator =function (data)  {
    const schema = Joi.object({
        name:Joi.string().required(),
        description:Joi.string().required(),
        address:Joi.string().required(),
        adminUser:Joi.string().required(),
        adminPassword: Joi.string().min(3).required(),
    });
    return schema.validate(data);
};
const loginValidator =function (data)  {
  const schema = Joi.object({
      adminUser:Joi.string().required(),
      adminPassword: Joi.string().min(3).required(),
  });
  return schema.validate(data);
};
const updateValidator =function (data)  {
  const schema = Joi.object({
      name:Joi.string(),
      description:Joi.string(),
      address:Joi.string(),
      adminUser:Joi.string(),
      adminPassword: Joi.string().min(3),
  });
  return schema.validate(data);
};
const idValidator =function (data)  {
  const mongoose = require('mongoose');
  const result=mongoose.isValidObjectId(data)
  console.log(result);
  
  return result
  };

  const foodValidator =function (data)  {
    const schema = Joi.object({
      name:Joi.string().required(),
      description:Joi.string().required(),
      price:Joi.number ().required(),
    });
    return schema.validate(data);
  };  

  const updatefoodValidator =function (data)  {
    const schema = Joi.object({
      name:Joi.string(),
      description:Joi.string(),
      price:Joi.number (),
    });
    return schema.validate(data);
  };  
module.exports = { updateValidator,registorValidator,idValidator,loginValidator,foodValidator,updatefoodValidator };

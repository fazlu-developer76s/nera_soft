db.users.aggregate([
  {
    $lookup: {
      from: "useraccesstokens",      
      localField: "_id",              
      foreignField: "user_id",        
      as: "UserDetail"
    }
  }
]).pretty();

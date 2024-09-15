const asyncHandler = (requestHandler) => {
  return (req, res, next) => {
    Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err));
  };
};

export { asyncHandler };

/* const  asyncHandler=() =>async(req, res,next) => {
    try{
        //code here
    }catch(error){
        res.status(error).json({
        sucess:false,
        message:error.message});
    }
    }

*/

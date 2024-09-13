const asyncHandler = (requestHandler) => {
  (req, res, next) => {
    Promise.resolve().catch((err) => next(err));
  };
};

export { asyncHandler };
/*
const  asyncHandler=() =>async(req, res,next) => {
    try{
        //code here
    }catch(error){
        res.status(error).json({
        sucess:false,
        message:error.message});
    }
    }

*/

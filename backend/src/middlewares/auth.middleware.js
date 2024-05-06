
export const auth = (req, res, next) => {
    console.log("auth object: ", req.user);
    (req.user?.role === "admin")? next() : res.status(401).json({status: "fail", message: "User is not allowed to access this endpoint"})
}


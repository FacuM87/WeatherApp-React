import { verifyToken } from "../utils.js";


export const auth = (roles) =>{
  return  (req, res, next) => {
    try {
      const token = req.cookies.jwt;
      const userData = verifyToken(token);
      const user = userData.user;

      if (!user || !roles.includes(user.role)) {
        return res.status(403).json({ message: "Access denied" });
      }

      req.user = user;
      next();
    } catch (error) {
      console.error("Authentication error: ", error.message);
      return res.status(401).json({ message: "Invalid or expired token" });
    }
}

}

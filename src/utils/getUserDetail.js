import jwt from "jsonwebtoken";
const getUserDetail = (Current_user_detail) => {
    const user = Current_user_detail;
    if (!Current_user_detail) {
        return null;
    }
    try {
        const decode_user = jwt.verify(Current_user_detail,process.env.REFRESH_TOKEN_SECRET);
        return decode_user;
    } catch (error) {
        console.log(error);
    }
    return console.log(user);
}

export { getUserDetail }
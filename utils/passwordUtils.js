import bcrypt from "bcryptjs";

export async function hashPassword(password) {
  //we generate a salt which is used to hash the passwords and then we take the password from the req.body and hash it and store it in req.body.
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
}

export const comparePassword = async (password, hashedPassword) => {  
  const isMatch = await bcrypt.compare(password, hashedPassword);
  return isMatch;
} 
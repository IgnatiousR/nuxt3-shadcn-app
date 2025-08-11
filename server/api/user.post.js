import prisma from "~/lib/prisma";
import bcrypt from "bcryptjs";
import validator from "validator";
// /api/user POST

// Hashing passwords
// - Prevents PW from being stored in plaintext
// - mypassword123 jnjvsadcjncuwinuiwebjksab,/#@$fasDFVCASDR$@#

// Salts
// - salt = string of random characters
// - Typically added to the beginning of a user's PW
//    - mypassword123 becomes x#fSA#Amypassword123
// - Used to prevent hackers from using precomputed hash tables to crack a PW
// - Each user gets their own salt so even if two users have the same PW
//   their password's look completely different

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    console.log("first", body);

    // if (body.name)
    if (body.password !== body.password_confirmation) {
      console.log("Inside");
      throw createError({
        statusCode: 404,
        message: "Err.",
        fatal: true,
      });
      // throw createError({
      //   statusCode: 400,
      //   message: "Invalid",
      // });
    }
    // if (!validator.isEmail(body.email)) {
    //   throw createError({
    //     statusCode: 400,
    //     message: "Invalid email, enter a valid email.",
    //   });
    // }

    // if (!validator.equals(body.password, body.password_confirmation)) {
    //   throw createError({
    //     statusCode: 400,
    //     message: "Password must match.",
    //   });
    // }

    // if (
    //   validator.isStrongPassword(body.password, {
    //     minLength: 8,
    //     minLowercase: 0,
    //     minUppercase: 0,
    //     minNumbers: 0,
    //     minSymbols: 0,
    //   })
    // ) {
    //   throw createError({
    //     statusCode: 400,
    //     message: "Password doesnot meet strength requirements.",
    //   });
    // }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(body.password, salt);

    // Sends to database
    await prisma.user.create({
      data: {
        email: body.email,
        password: passwordHash,
        salt: salt,
      },
    });
    console.log("Sec:", body);
    return { data: "success" };
  } catch (error) {
    //console.log("er:", error);
    if (error.code === "P2002") {
      throw createError({
        statusCode: 409,
        message: "An email with this address already exists.",
      });
    }
    //throw error;
  }
});

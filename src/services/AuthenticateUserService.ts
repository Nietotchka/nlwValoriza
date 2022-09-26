import {getCustomRepository} from "typeorm"
import{compare} from "bcryptjs"
import{sign} from "jsonwebtoken"
import { UsersRepositories} from "../repositories/UsersRepositories"

interface IAutenticateRequest{
  email: string;
  password: string;
}

class AuthenticateUserService{

  async execute({email,password}: IAutenticateRequest){
    const usersRepositories = getCustomRepository(UsersRepositories)

    const user = await usersRepositories.findOne({
      email
    });

    if (!user){
      throw new Error("Email/Password incorrect")
    }

    const passwordMatch  = await compare (password, user.password);

    if(!passwordMatch){
      throw new Error("Email/Password incorrect")
    }

    const token = sign({
      email:user.email,
    },
    "4f93ac9d10cb751b8c9c646bc9dbccb9",
    {
      subject:user.id,
      expiresIn:"1d"
    })
  }
}

export{AuthenticateUserService}
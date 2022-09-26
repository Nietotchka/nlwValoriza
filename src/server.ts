import "reflect-metadata"; //10.1K (gzipped: 3K)
import express, {Request, Response, NextFunction} from "express";
import "express-async-errors";
import{router} from "./routes"
import "./database"
const app = express();

/*
GET => Buscar informações
POST => Inserir (criar) informações
PUT => Alterar informações
DELETE => Remover dados
PATCH => Alterar informações específicas
*/

/**
 * Tipos de Parametros
 * Routes Params-> http://localhost:3000/produtos/9839398393038938
 * Query Params-> http://localhost:3000/produtos?name=teclado&description=tecladobom/
 * Body Params-> {
 *  "name": "teclado",
 *  "description": "tecladobom"
 * }
 */

app.use(express.json());

app.use(router);

app.use((err: Error,request: Request,response:Response, next: NextFunction)=>{
  if(err instanceof Error){
    return response.status(400).json({
      error:err.message
    })
  }
  return response.status(500).json({
    status:"error",
    message:"Internal Server Error"
  })
})

// http://localhost:8000
app.listen(8000, () => console.log("Server is running") );
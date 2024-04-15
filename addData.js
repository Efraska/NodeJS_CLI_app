import inquirer from "inquirer";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";
import queryDB from "./queryDB.js";

export default async function addData(info) {
    try {
        const answers = await inquirer.prompt([
            {
                type: "input",
                name: "name",
                message: "¿Como te llamas?",
            },
            {
                type: "number",
                name: "phone",
                message: "¿Cual es tu # de Teléfono?",
            },
            {
                type: "list",
                name: "age",
                message: "¿Eres mayor de Edad?",
                choices: [
                    { name: "Y", value: "Adult" },
                    { name: "N", value: "Minor" },
                ],
            },
        ]);

        const data = {
            id: uuidv4(),
            name: answers.name,
            phone: answers.phone,
            age: answers.age,
        };
        info.push(data);

        if (fs.existsSync("db.json")) {
            createDetails(info);
        } else {
            fs.appendFile("db.json", "[]", (err) => {
                if (err) {
                    console.log("No se pudo crear bd.json", err);
                    return;
                }
                createDetails(info);
            });
        }
    } catch (error) {
        console.log("¡Algo salió mal!", error);
    }
}

async function createDetails(info) {
    await fs.writeFile("db.json", JSON.stringify(info), function (err) {
        if (err) {
            console.log(err)
        }
        console.log("¡Guardado!");
    });
}

queryDB(addData);
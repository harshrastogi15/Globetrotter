import { AppError } from "./errorHandler.js";
import { Logger } from "./logger.js";
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export class cityList {

    static cityListData = new Set();

    static async generateList() {
        try {
            if (this.cityListData.size !== 0) {
                Logger.log("City List already exist")
                return;
            }
            Logger.log("Generating City List ")

            for (let i = 0; i < 10; i++) {
                const filePath = join(__dirname, '../../../questionData',`data${i}.json`);
                const data = fs.readFileSync(filePath, 'utf-8');
                const jsonData = JSON.parse(data);
                jsonData.forEach((item) => {
                    cityList.cityListData.add({
                        city: item.city,
                        country: item.country,
                    });
                });
            }
            Logger.log("City List generated successfully.");
        } catch (error) {
            Logger.log("Error generating city list:" + error);
            throw new AppError("Unable to generate question", "500")
        }
    }

    static async getList() {
        try {
            await this.generateList();
            return Array.from(this.cityListData);
        } catch (error) {
            throw error
        }
    }

}

const path = require('path');
const axios = require('axios');
const { execSync } = require('child_process');

class SeleniumGrid {
    constructor() {
        this.host = 'http://localhost:4444';
        this.dockerComposeFilePath = path.join(process.cwd(), 'configs', 'selenium-grid', 'selenium.yml');
    }

    stopGrid() {
        const shutdownCommand = `docker-compose -f ${this.dockerComposeFilePath} down`;

        console.log('Stopping Selenium Grid ... ', shutdownCommand);
        execSync(shutdownCommand);
    }

    async startGrid({ chrome, firefox }) {

        if(!chrome && !firefox){
            throw new Error('Missing instances of chrome or firefox');
        }

        const startUpCommand = `docker-compose -f ${this.dockerComposeFilePath} up --scale chrome=${chrome} --scale firefox=${firefox} -d`;

        console.log('Starting Selenium Grid ... ', startUpCommand);
        execSync(startUpCommand);

        console.log('Waiting for Selenium Grid to be ready ...');
        await waitForCondition(async () => 
            await this.isGridReady(chrome + firefox), {
                timeout: 30000,
                interval: 1000,
            }
        );

    }

    async isGridReady(numberOfInstances) {
        try {
            const availableSlots = await this._getAvailableSlots();

            if (availableSlots >= numberOfInstances) {
                console.log(`There are ${availableSlots} nodes available`);

                return true;
            }

            return false;
        } catch (err) {
            console.log(`Selenium Grid still not available: ${err.message}`);
            return false;
        }
    }

    async _getAvailableSlots() {
        const response = await axios.get(`${this.host}/grid/api/hub`);
        return response.data.slotCounts.free;
    }

}

async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function waitForCondition(condition, {timeout, interval}) {
    const startTime = Date.now();
    while (Date.now() - startTime <= timeout) {
        const conditionEnd = await condition();
        if (conditionEnd) {
            return;
        }
        await sleep(interval);
    }
    throw new Error(`Condition timed out after ${timeout}ms`);
}

module.exports = SeleniumGrid;

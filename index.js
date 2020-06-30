const Launcher = require('@wdio/cli').default;
const SeleniumGrid = require('./configs/selenium-grid/seleniumDocker');

async function setUpSeleniumGridAndRunTests(){
    
    const selenium = new SeleniumGrid();

    const customConfig = {
        hostname: 'localhost',
        port: 4444,
        path: '/wd/hub',
    };

    try {
        selenium.stopGrid();
        await selenium.startGrid({ chrome: 2, firefox: 1});
        
        const launcher = new Launcher(`${process.cwd()}/configs/wdio.conf.js`, customConfig);
        return await launcher.run();    
    }
    finally {
        selenium.stopGrid();
    }
}

setUpSeleniumGridAndRunTests();



const fs = require('fs');
const path = require('path');
const packageJson = require('../package.json');

const versionInfo = {
    BUILD_ID: process.env.BUILD_ID || 'local',
    GIT_COMMIT: process.env.GIT_COMMIT || 'development',
    DOCKER_TAG: process.env.DOCKER_TAG || 'latest',
    VERSION: packageJson.version,
};

fs.writeFileSync(path.join(__dirname, '..', 'versions.json'), JSON.stringify(versionInfo, null, 2));

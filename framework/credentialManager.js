const request = require('request-promise-native');

async function createSession(serverURI) {
    const sessionCreateOptions = {
        uri: `${serverURI}/api/session/create`,
        json: true
    }
    try {
        const sessionId = await request(sessionCreateOptions);
        return sessionId
    } catch (e) {
        console.log(e.statusCode);
        console.log(e.message);
    }
}

async function createUserPool(serverURI, env, credentials, sessionId) {
    const options = {
        method: 'POST',
        uri: `${serverURI}/api/users/pool/create`,
        body: {
            env: process.env.ENV,
            creds: credentials,
            sessionId: sessionId
        },
        json: true
    }
    try {
        const res = await request(options);
    } catch (e) {
        console.log(e.statusCode);
        console.log(e.message);
    }
}

async function deleteUserPool(serverURI, env, sessionId) {
    const options = {
        method: 'POST',
        uri: `${serverURI}/api/users/pool/delete`,
        body: {
            env: env,
            sessionId: sessionId
        },
        json: true
    }

    try {
        const res = await request(options);
        console.log(`Users for env ${env} were unlocked!`);
    } catch (e) {
        console.log(`Users for env ${env} still are locked!`);
        console.log(e.statusCode);
        console.log(e.message);
    }
}

async function lockUser(serverURI, env) {
    const options = {
        method: 'POST',
        uri: `${serverURI}/api/users/user/lock`,
        body: {
            env: env
        },
        json: true
    }
    try {
        const res = await request(options);
        return res;
    } catch (e) {
        console.log(e.statusCode);
        console.log(e.message);
    }
}

async function unlockUser(serverURI, env, userName) {
    const options = {
        method: 'POST',
        uri: `${serverURI}/api/users/user/unlock`,
        body: {
            env: env,
            userName: userName

        },
        json: true
    }
    try {
        const res = await request(options);
    } catch (e) {
        console.log(e.statusCode);
        console.log(e.message);
    }
}

module.exports = {
    createSession,
    createUserPool,
    deleteUserPool,
    lockUser,
    unlockUser
}
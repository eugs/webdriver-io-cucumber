"use strict";

const request = require("request-promise-native");
const CredentialManager = require("./CredentialManager");

/**
 * @implements {CredentialManager}
 */
class ServerCredentialManager extends CredentialManager {

    /**
     * Create pool of userIds based on creds object
     * @param creds
     */
    static createPool(creds) {
        return request({
            method: "POST",
            uri: "http://localhost:3099/credentials",
            body: creds,
            json: true
        }).catch(e => {
            throw new Error("Credential pool has not been created")
        })
    }

    /**
     * Return free credentials from pool
     */
    static getCredentials() {
        this.credentials = request({
            method: "GET",
            uri: "http://localhost:3099/credentials",
        }).then((body) => {
            return JSON.parse(body)
        }).catch(e => {
            throw new Error("Cannot get credentials")
        })
    }

    /**
     * Free credentials
     */
    static freeCredentials() {
        if (this.credentials) {
            return this.credentials.then(credentials => {
                return request({
                    method: "PUT",
                    uri: "http://localhost:3099/credentials",
                    body: {
                        username: credentials.username
                    },
                    json: true
                })
            }).catch(e => {
                throw new Error("Cannot free credentials")
            })
        }
    }


}

module.exports = ServerCredentialManager;
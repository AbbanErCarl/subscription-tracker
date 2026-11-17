import type { RequestHandler } from "express";

export const getAllUsers: RequestHandler = (_req, res) => {
    res.send("Get all users")
}

export const getUserById: RequestHandler = (_req, res) => {
    res.send("Get user details by ID")
}

export const createUser: RequestHandler = (_req, res) => {
    res.send("Create a new user")
}
export const updateUser: RequestHandler = (_req, res) => {
    res.send("Update a user's details")
}
export const deleteUser: RequestHandler = (_req, res) => {
    res.send("Delete a user")
}
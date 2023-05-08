import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { faker } from "@faker-js/faker";

const createUser = createAsyncThunk("users/add", async () => {
    const request = await axios.post("http://localhost:3005/users", {
    name: faker.name.fullName()
    });

    return request.data;
});

export { createUser };
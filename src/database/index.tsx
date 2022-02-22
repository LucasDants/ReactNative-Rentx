import { Database } from "@nozbe/watermelondb";
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite'
import { Car } from "./models/Car";
import { User } from "./models/User";
import { schemas } from "./schemas";


const adapter = new SQLiteAdapter({
    schema: schemas
})

export const database = new Database({
    adapter,
    modelClasses: [User, Car],
})
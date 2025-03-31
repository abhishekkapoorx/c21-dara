"use server"

import { auth } from "@/auth";

const getSession = async () => {
    // "use server"
    return await auth();
}

export default getSession;
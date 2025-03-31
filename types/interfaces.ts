export interface ContactInterface {
    id: string;
    email: string;
    subject: string;
    message: string;
    name: string;
    phone: string;
    resolved: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export enum FileType {
    VIDEO = "VIDEO",
    AUDIO = "AUDIO",
    IMAGE = "IMAGE",
}

export interface UserInterface {
    id: string;
    name?: string;
    email?: string;
    emailVerified?: Date;
    isEmailVerified: boolean;
    password?: string;
    role: "ADMIN" | "MODERATOR" | "USER";
    image?: string;
    phone?: string;
}

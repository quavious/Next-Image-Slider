export interface Payload {
    user : {
        id: number
    }
}

export interface ReturnAuth {
    verified: boolean;
    userId: number;
} 

export interface ReturnToken {
    isError : boolean;
    message: string
}
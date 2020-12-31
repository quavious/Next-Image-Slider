export default class AuthState {
    private user: any;
    constructor(){
        this.user = null
    }
    public updateState(user) {
        if(!user) {
            console.error("No User Data")
            return;
        }
        this.user = user;
    }
    public clearState() {
        this.user = null;
    }
    public returnState() {
        return !this.user ? null : this.user
    }
}
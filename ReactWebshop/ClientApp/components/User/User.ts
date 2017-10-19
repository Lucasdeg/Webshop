import {account} from "../DatabaseSimulation/TableTypes";

//The class for the user that logs in
//It stores the data of the user
//It has also a method that can be used to check if an user is logged in.

export class User{
    private static pk: number;
    private static firstName: string;
    private static lastName: string;
    private static email: string;
    private static username:string;
    private static password:string;
    private static wishListFK: number;
    private static shoppingCartFK: number;
    private static orderFK: number | number[]
    private static user: User;
    private static isLoggedIn: boolean = false;
    private constructor(){
    }
    //The singleton pattern, only one instance of this class can be created (notice private constructor)
    public static CreateUser() : User{
        if(User.user == null){
            User.user = new User();
            User.isLoggedIn = true;
            return User.user;
        }
        throw new Error("There is already a user created!")

    }
    public static IsUserLoggedIn() : boolean{
        return User.isLoggedIn;
    }
    //When the user logs the data
    //Come into this method and then the user gets created
    public SetAccount(account: account){
        User.isLoggedIn = true;
        User.pk = account.pk;
        User.firstName = account.firstName;
        User.lastName = account.lastName;
        User.email = account.email;
        User.username = account.username;
        User.password = account.password;
        User.wishListFK = account.wishListFK;
        User.shoppingCartFK = account.shoppingCartFK;
        User.orderFK = account.orderFK
    }
    public static LogUserOut(){
        User.isLoggedIn = false;
        User.user = null;
    }
    public static GetPK(){
        return User.pk;
    }
    public static GetFirstname(){
        return User.firstName;
    }
    public static GetLastname(){
        return User.lastName;
    }
    public static GetEmail(){
        return User.email;
    }
    public static GetUsername(){
        return User.username;
    }
    public static GetPassword(){
        return User.password;
    }
    public static GetWishListFK(){
        return User.wishListFK;
    }
    public static GetShoppingCartFK(){
        return User.shoppingCartFK;
    }
    public GetOrderFK(){
        return User.orderFK;
    }
}
export default User;

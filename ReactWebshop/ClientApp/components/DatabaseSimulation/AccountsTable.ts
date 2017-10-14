import {account} from "./tableTypes";
import {order1} from "./OrdersTable";

//Accounts Table

export let user1: account = {
    pk:1,
    firstName: "Jan",
    lastName: "Pieter",
    email: "pietje.piet@live.nl",
    username: "pieterman",
    password: "test123",
    wishList: null,
    shoppingCart: null,
    orderFK: order1.pk
}
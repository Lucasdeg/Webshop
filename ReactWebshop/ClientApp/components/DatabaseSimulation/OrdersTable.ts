import {order} from "./TableTypes";
import {gameTableData, accountsTableData} from "ClientApp/components/DatabaseSimulation/FakeDatabase"

export let order1: order = {
    pk: 1,
    accountFK: 1, 
    productFK: 1, 
    orderdate: "10 Oktober 2017",
    statusOfOrder: "Bezorgd"
}
import {console,game,account, order} from "./TableTypes";
import * as gameTable from "./GameTable";
import * as accountsTable from "./AccountsTable";
import * as consoleTable from "./ConsoleTable";
import * as orderTable from "./OrdersTable";
import {List} from "linqts";

//The seperate database entities have been put in an array to simulate a database
//The lists can be approached with LINQ

export let gameTableData = new List<game>([gameTable.game1,gameTable.game2,gameTable.game3,gameTable.game4,gameTable.game5,gameTable.game6,gameTable.game7,
    gameTable.game8,gameTable.game9,gameTable.game10])

export let accountsTableData  = new List<account>([accountsTable.user1])

export let consoleTableData = new List<console>([consoleTable.console1, consoleTable.console2, consoleTable.console3, consoleTable.console4])

export let orderTabledata = new List<order>([orderTable.order1])
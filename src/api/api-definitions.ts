import { DOMAIN, refreshAPI } from "node-rest-objects/dist/rest/api";
import Constants from "expo-constants";

const LOCAL_IP = Constants.manifest.extra.serverIp; // change this as required in the app.json->extra->serverIp
const APIDefinitions = {
    USER_MANAGEMENT_LOCAL : `http://${LOCAL_IP}:4000`,
    QUERIES_LOCAL : `http://${LOCAL_IP}:4001`,
    GROUPS_LOCAL : `http://${LOCAL_IP}:4002`,
    CHATS_LOCAL : `http://${LOCAL_IP}:4003`
}

export enum AppColors {
    PRIMARY = "#3F51B5",
}

export const applyLocalDefinitions = () =>{
    
    DOMAIN.USER_MANAGEMENT = APIDefinitions.USER_MANAGEMENT_LOCAL,
    DOMAIN.QUERIES = APIDefinitions.QUERIES_LOCAL,
    DOMAIN.GROUPS = APIDefinitions.GROUPS_LOCAL
    refreshAPI();

    console.log("Definitions RESET", DOMAIN);
}


// Query Definitions 



// export interface IQuery {
//     _id: string;
//     author: IUser;
//     published: Content;
//     draft: Content;
//     createdAt: any;
//     status: string;
//     customAttributes: any;
//     stats: Stats;
//     access: {
//         type: string;
//         users: string[];
//     };
//     [prop: string]: any;
// }

// interface Content {
//     _id: string;
//     title: string;
//     body: string;
//     tags: String[];
//     lastModifiedAt: any;
//     [prop: string]: any;
// }
// interface Stats {
//     _id: string;
//     viewCount: number;
//     responseCount: number;
//     followCount: number;
//     upVoteCount: number;
//     downVoteCount: number;
//     spamReportCount: number;
//     score: number;
//     [prop: string]: any;
// }


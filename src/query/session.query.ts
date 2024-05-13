import BaseQuery from "@/base/base.query";
import { Session } from "@/interfaces/session.interface";


class SessionQuery extends BaseQuery<Session, Session> {
    protected collectionName: string = 'session';
    protected attributeBase: string = 'userId';
    protected listAttribute: string[] = [
        "sessionId",
        "userId",
        "startTime",
        "expirationTime",
        "ipAddress",
        "userAgent",
        "deviceInfo",
    ];

}

export default SessionQuery; 
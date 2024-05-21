import BaseService from "@/base/base.service";
import { RequestInforSystem, RequestInforSystemWithoutId, RequestInforUserWithoutId } from "@/interfaces/request.interface";
import RequestInforQuery from "@/query/requestInfor.query";
import NotificationService from "./notification.service";
import { NotificationInforSystemWithoutId } from "@/interfaces/notification.interface";

class RequestInforService extends BaseService<any, any, any> {
    protected nameBase: string = 'Request';
    protected attributeBase: string = '';

    protected query: RequestInforQuery;

    protected notificationService: NotificationService;

    constructor() {
        super();
        this.query = new RequestInforQuery();
        this.notificationService = new NotificationService();
    }

    public async createRequest(create: string, type: string, createData: RequestInforSystemWithoutId | RequestInforUserWithoutId,) {

        if (create == 'system') {
            if (type == 'update-info') {
                const create = await this.createSystemUpdateRequest(createData);
                return create;
            }
        }
    };

    public async createSystemUpdateRequest(createData: RequestInforSystemWithoutId | RequestInforUserWithoutId) {

        const req: RequestInforSystem = await this.query.saveData(createData)

        if (req) {

            req.receiverId.forEach(async (receiverId) => {
                const notidata: NotificationInforSystemWithoutId = {
                    source: "update-info",
                    requestId: req._id,
                    type: req.type,
                    status: false,
                    title: req.title,
                    content: req.content,
                    receiveId: receiverId
                }
                await this.notificationService.create(notidata);
            });

        }

    }

}

export default RequestInforService;


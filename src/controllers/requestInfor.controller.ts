import BaseController from "@/base/base.controller";
import RequestInforService from "@/services/requestInfor.service";


class ResquestInforController extends BaseController<any, any, any>{

    protected service: RequestInforService;

    constructor() {
        super();
        this.service = new RequestInforService();
    }

}
export default ResquestInforController
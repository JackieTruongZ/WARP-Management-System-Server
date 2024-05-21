import BaseQuery from "@/base/base.query";


class ScheduleQuery extends BaseQuery<any, any, any> {
    protected listFieldFilter: string[];
    protected collectionName: string = 'calendar';
    protected attributeBase: string = '';
    protected listAttribute: string[] = [
        "type",
        "date",
    ];
}

export default ScheduleQuery; 
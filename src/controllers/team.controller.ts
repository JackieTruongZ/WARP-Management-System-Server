import BaseController from "@/base/base.controller";
import { CreateTeamDto, UpdateTeamDto } from "@/dtos/team.dto";
import { Team } from "@/interfaces/team.interface";
import TeamService from "@/services/team.service";
import UserService from "@/services/users.service";

class TeamController extends BaseController<Team, CreateTeamDto, UpdateTeamDto>{

    protected service: TeamService;
    protected userService: UserService;

    constructor() {
        super();
        this.service = new TeamService();
    }

}
export default TeamController
import { UserInfo } from "./userInfo";

export class UserGraduationReqInfo {
  studentData?: UserInfo;
  materiasOb?: boolean;
  materiasElec?: boolean;
  pendientesNotas?: boolean;
  biblioteca?: boolean;
  cartera?: boolean;
  impedimento?: boolean;
  msg!: string;
}

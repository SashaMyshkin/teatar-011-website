import Controls from "./Controls"

interface RolesProps{
  performance_uid?:number,
  member_uid?:number
}

export default function Roles({performance_uid, member_uid}:RolesProps){
  return<><Controls></Controls></>
}
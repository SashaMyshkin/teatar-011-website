import Controls from "@components/roles/Controls"

interface RolesProps{
  performance_uid?:number,
  member_uid?:number
}

export default function Roles({performance_uid, member_uid}:RolesProps){
  console.log(performance_uid, member_uid)
  return<><Controls></Controls></>
}
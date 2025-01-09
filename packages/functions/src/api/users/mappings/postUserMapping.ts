import { defaultFirestoreProps } from "../../../utils";
import { UserBody } from "../postUser";

export const postUserMapping = (user: UserBody): User => {
  const { assignCreateProps } = defaultFirestoreProps();
  return assignCreateProps({
    id: user.id,
    roleCode: user.roleCode,
    email: user.email,
    address: user.address,
    password: user.password,
    dni: user.dni,
    firstName: user.firstName,
    paternalSurname: user.paternalSurname,
    maternalSurname: user.maternalSurname,
    phone: user.phone,
    iAcceptPrivacyPolicies: true,
    isDeleted: false,
    status: "registered",
  });
};

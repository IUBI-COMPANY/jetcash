type RoleCode =
  | "super_admin"
  | "admin"
  | "academic_supervisor"
  | "academic_coordinator"
  | "company_representative"
  | "user";

interface Role {
  code: RoleCode;
  name: string;
  imgUrl: string;
  updateAt: string;
}

interface RoleAcls extends DefaultFirestoreProps {
  id: string;
  acls: string[];
  roleCode: string;
}

interface User extends DefaultFirestoreProps {
  id: string;
  roleCode: RoleCode;
  email: string;
  address: string;
  password: string;
  profilePhoto?: Image;
  dni: string;
  firstName: string;
  paternalSurname: string;
  maternalSurname: string;
  phone: {
    prefix: string;
    number: string;
  };
  status: string;
  iAcceptPrivacyPolicies: boolean;
}

interface Image {
  name: string;
  status?: string;
  thumbUrl: string;
  uid: string;
  url: string;
}

interface Archive {
  name: string;
  status?: string;
  uid: string;
  url: string;
}

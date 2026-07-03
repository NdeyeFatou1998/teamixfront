export type Membership = {
  id: string;
  organizationId: string;
  organizationName: string;
  organizationSlug: string;
  roleName: string | null;
};

export type AuthUser = {
  id: string;
  email: string;
  isPlatformSuperAdmin: boolean;
};

export type LoginResponse = {
  accessToken: string;
  user: AuthUser;
  memberships: Membership[];
};

export type Organization = {
  id: string;
  name: string;
  slug: string;
  status: string;
  createdAt: string;
  _count?: { members: number };
};

export type Employee = {
  id: string;
  jobTitle: string | null;
  employeeNumber: string | null;
  createdAt: string;
  department: { id: string; name: string } | null;
  manager: {
    id: string;
    member: { user: { email: string } };
  } | null;
  member: {
    id: string;
    user: { id: string; email: string };
    role: { name: string } | null;
  };
};

export type AvailableMember = {
  id: string;
  user: { email: string };
  role: { name: string } | null;
};

export type MeResponse = AuthUser & {
  memberships: Membership[];
  organizationId: string | null;
  permissions: string[];
};

export type Department = {
  id: string;
  name: string;
  description: string | null;
  parentDepartmentId: string | null;
  createdAt: string;
  parentDepartment?: { id: string; name: string } | null;
  _count?: { childDepartments: number };
};

export type PlatformStats = {
  organizations: number;
  users: number;
  members: number;
};

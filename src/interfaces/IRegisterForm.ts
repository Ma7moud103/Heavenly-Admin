type TRoles = "staff" | "admin" | "super_admin"
export interface IForm{
    full_name: string;
    phone: string;
    avatar_url?: string;
    role_name: TRoles;
    is_active: boolean;
    email: string;
    password: string;
    confirm_password: string;
    country: string;
    visits?: number;
}


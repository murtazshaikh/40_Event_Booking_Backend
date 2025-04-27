export class CreateUserDto {
    readonly email: string;
    readonly password: string;
    readonly role?: string; // optional, default role is 'user'
}
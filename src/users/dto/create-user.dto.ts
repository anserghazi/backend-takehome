import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
    @ApiProperty()
    username: string;

    @ApiProperty({
        type: String,
        description: "The default password for all accounts is 'admin'.",
        default: "admin",
    })
    password: string;
}

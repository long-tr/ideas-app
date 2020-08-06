
export class createIdeaDto{
    idea: string
    description: string
}
export type updateIdeaDto = Partial<createIdeaDto>
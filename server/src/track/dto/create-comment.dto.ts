import { Types } from 'mongoose';

export class CreateCommentDto {
  readonly username: string;
  readonly text: string;
  readonly trackId: Types.ObjectId;
}

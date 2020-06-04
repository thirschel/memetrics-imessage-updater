import moment from "moment";
import { Attachment } from "./attachment";

export class MessageEntity {
  ROWID: number;
  messageId: string;
  phoneNumber: string;
  name: string;
  isIncoming: number;
  text: string;
  isMedia: number;
  threadId: string;
  occurredEpoch: number;
}

export class Message {
  constructor(messageEntity: MessageEntity) {
    this.messageId = messageEntity.messageId;
    this.phoneNumber = messageEntity.phoneNumber;
    this.isIncoming = messageEntity.isIncoming == 1;
    this.isMedia = messageEntity.isMedia == 1;
    this.text = messageEntity.text ?? '';
    this.threadId = `i-${messageEntity.threadId}`;
    this.occurredDate = moment(messageEntity.occurredEpoch * 1000).format();
  }
  public messageId: string;
  public phoneNumber: string;
  public name: string;
  public occurredDate: string;
  public isIncoming: boolean;
  public text: string;
  public isMedia: boolean;
  public threadId: string;
  public attachments: Attachment[];
}

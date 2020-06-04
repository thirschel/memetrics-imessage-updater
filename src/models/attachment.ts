export class AttachmentEntity {
  guid: string;
  filename: string;
  transfer_name: string;
}

export class Attachment {
  constructor(attachmentEntity: AttachmentEntity) {
      this.attachmentId = attachmentEntity.guid;
      this.fileName = attachmentEntity.filename;
  }
  attachmentId: string;
  base64Data: string;
  fileName: string;
}

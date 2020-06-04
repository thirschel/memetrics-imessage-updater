export const GetMessageAttachments: string = `
SELECT 
    guid, 
    filename, 
    transfer_name 
FROM attachment a
INNER JOIN message_attachment_join maj on a.ROWID = maj.attachment_id
WHERE message_id = ? AND mime_type LIKE '%image%'
`;
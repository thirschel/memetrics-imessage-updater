export const GetMessageSql: string = `
SELECT
	m.ROWID,
    m.guid as messageId, 
	case m.handle_id WHEN 0 THEN 1 ELSE m.handle_id END as handleId,
    substr(h.id, 2, length(h.id)) as phoneNumber, 
    m.date + strftime("%s", "2001-01-01") as occurredEpoch, 
    m.is_from_me == 0 as isIncoming, 
    m.text, 
    m.cache_has_attachments as isMedia, 
    cmj.chat_id as threadId
FROM message m 
INNER JOIN handle h ON handleId = h.ROWID
INNER JOIN chat_message_join cmj ON m.ROWID = cmj.message_id
WHERE CAST(occurredEpoch AS integer) > CAST(strftime("%s", ?) AS integer)
ORDER BY m.date DESC;
`;
import { Attachment, AttachmentEntity } from "./models/attachment";
import { GetMessageAttachments } from "./sql/get-message-attachments-sql";
import { Message, MessageEntity } from "./models/message";
import { GetMessageSql } from "./sql/get-message-sql";
import { verbose, Database } from "sqlite3";
import { schedule } from "node-cron";
import fetch from "node-fetch";
import express from "express";
import moment from "moment";
import fs from 'fs';
import data from "../appsettings.json";
import { Appsettings } from "./models/appsettings";

const sqlite3 = verbose();
const app = express();
let appSettings: Appsettings = data;

schedule("* 1 * * *",  async function () {
  console.log('Starting execution')
    let db = new sqlite3.Database(appSettings.dbPath, (err) => {
       if (err) {
          return console.error(err.message);
       }
    });
    
    db.parallelize(async () => {
      const startDate = moment().subtract(2, "day").format("YYYY-MM-DD");
      db.all(GetMessageSql, [startDate], async (err, rows: MessageEntity[]) => {
        if (err) {
          throw err;
        }
        for (var i = 0; i < rows.length; i++) {
          const message = new Message(rows[i]);
          message.attachments = await getMessageAttachments(db, rows[i].ROWID);
          const response = await fetch(`${appSettings.memetricsUrl}/api/v1/messages`, {
             method: "POST",
             body: JSON.stringify(message),
             headers: {
                "X-Api-Key": appSettings.apiKey,
                "Content-Type": "application/json",
             },
          });
          await response.json();
        }
      });
    });
    db.close();
  },
  {
    scheduled: true,
    timezone: "America/New_York",
  }
);

const getMessageAttachments = async (db: Database, messageId: number): Promise<Attachment[]> => {
  var promise = new Promise<Attachment[]>((resolve, reject) => {
    db.all(GetMessageAttachments, [messageId], async (err, rows: AttachmentEntity[]) => {
      const attachments = [];
      if(!rows){
        resolve(attachments);
        return;
      }
      for (var i = 0; i < rows.length; i++) {
        var attachment = new Attachment(rows[i]);
        const filePath = rows[i].filename.replace('~/Library/Messages', appSettings.imagePath);
        attachment.base64Data = fs.readFileSync(filePath, { encoding: "base64" });
        attachments.push(attachment);
      }
      resolve(attachments);
    });
  }) ;
  return await promise;
};

app.listen(3128);

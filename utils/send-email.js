import dayjs from "dayjs";
import transporter, { accountEmail } from "../config/nodemailer";
import { emailTemplates } from "./email.temple"

export const sendReminderEmail = async ({to, type, subscription}) => {
    if(!to || !type){
        throw new Error("Missing required feilds")
    }
    const template = emailTemplates.find(t => t.label ===type);

    if(!template){
        throw new Error("Invalid email type")
    }

    const mail_info = {
        username: subscription.user.name,
        subscriptionName: subscription.name,
        renewalDate: dayjs(subscription.renewalDate).format("DD MMM YYYY")  ,
        planName: subscription.name,
        price: `${subscription.currency} ${subscription.price}  (${subscription.frequency})`,
        paymentMethod: subscription.paymentMethod,
    }


    const message = template.generateBody(mail_info);
    const subject = template.generateSubject(mail_info);

    const mailOptions = {
        from: accountEmail,
        to: to,
        subject: subject,
        html : message,
    }

    transporter.sendMail(mailOptions,(error,info)=>{
        if(error){
            return console.log(error, 'Error sending Email');
        }

        console.log('Email sent: '+ info.response); 
    })


}
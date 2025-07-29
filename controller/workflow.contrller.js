import dayjs from "dayjs";
import Subscription from "../models/subscription.model";
import { createRequire } from "module";
import { sendReminderEmail } from "../utils/send-email";
const require = createRequire(import.meta.url);
const { serve } = require('@upstash/workflow/express');

const Reminders = [7,5,2,1]

export const sendReminders = serve(async () => {
    const { subscriptionId } = context.requestPayload; 
    const subscription = await fetchSubscription(context, subscriptionId);

    if(!subscription || subscription.status !== 'active') {
        return;
    }

    const renewalDate = dayjs(subscription.renewalDate)

    if(renewalDate.isBefore(dayjs())) {
        console.log(`Renewal date has passed for ${subscriptionId}.Stopping workflow`);
        return;
    }

    for(const daysBefore of Reminders) {
        const reminderDate = renewalDate.subtract(daysBefore, 'day');

        if(reminderDate.isAfter(dayjs)){
            await sleepUntilReminder(context, `Reminder ${daysBefore} days before renewarl`, reminderDate)
        }
        await triggerReminder(context, `Reminder ${daysBefore} days before renewarl`)
    }
});

const fetchSubscription = async (context, subscriptionId) => {
    return await context.run('get subscription', async () =>{
        return Subscription.findById(subscriptionId).populate('user','name email');
        
    })
}

const sleepUntilReminder = async (context,label, date) => {
    console.log(`sleeping untl ${label} reminder at ${date}`);
    await context.sleepUntil(label,date.toDate());
}

const triggerReminder = async(context,label)=>{
    return await context.run('trigger reminder', async()=>{
        await sendReminderEmail({
            to: subscription.user.email,
            type: reminder.label.subscription,
            subscription: subscription,
        })
    }) 
}
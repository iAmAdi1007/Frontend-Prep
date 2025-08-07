/* Factory pattern is one which enables to create objects dynamically at runtime
    Real Life use case - Creating a Notification Object
    Check implementation below
*/
type NotificationType = 'SMS' | 'EMAIL' | 'PUSH'

interface SMSAttributes {
  phone: string;
  message: string;
}

interface EmailAttributes {
  email: string;
  message: string;
}

interface PushAttributes {
  deviceID: string;
  message: string;
}

class SMSNotification{
    phone: string;
    message: string
    constructor(phone: string, message:string){
        this.phone = phone;
        this.message = message;
    }
    send(){
        console.log(`Sending SMS Notification to phone ${this.phone} with message "${this.message}"`)
    }
}

class EmailNotification{
    email: string;
    message: string
    constructor(phone: string, message:string){
        this.email = phone;
        this.message = message;
    }
    send(){
        console.log(`Sending Email Notification to emailID ${this.email} with message "${this.message}"`)
    }
}

class PushNotification{
    deviceID: string;
    message: string
    constructor(phone: string, message:string){
        this.deviceID = phone;
        this.message = message;
    }
    send(){
        console.log(`Sending Push Notification to deviceID ${this.deviceID} with message "${this.message}"`)
    }
}


class NotificationFactory{
    notification: PushNotification | SMSNotification | EmailNotification;
    createNotification(type: NotificationType, attributes: SMSAttributes | EmailAttributes | PushAttributes) {
        switch(type){
            case 'SMS':
                this.notification = new SMSNotification((attributes as SMSAttributes).phone, attributes.message)
                break;
            case 'EMAIL':
                this.notification = new EmailNotification((attributes as EmailAttributes).email, attributes.message)
                break;
            case 'PUSH':
                this.notification = new PushNotification((attributes as PushAttributes).deviceID, attributes.message)
                break;
        }
        return this.notification;
    }
}

const notification = new NotificationFactory();

const smsNotification = notification.createNotification('SMS', {phone : '123-456-7890', message: 'Hi! How are you'});

smsNotification.send();
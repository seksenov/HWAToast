Demo: Notifications
============

This demo shows a quick way to add a notification to your website. It's intended purpose is to show native notifications from remote code in a Hosted Web App on Windows 10 but has fallbacks to web notifications, followed by alerts if the website is run in the browser.

In order for the Windows Toast code to work you need to be running this project as a Universal Windows App on a Windows 10 device. Otherwise you'll be able to check it out in the browser.

### For Windows 10:

#### Step 1
Clone the repo locally 

```
npm install
gulp appx:dev
``` 

This will start a localhost server an open a browser window and launch a hosted web app pointing to it.
You will also have an external URL that you can connect to from a mobile device.

#### Step 2
Create a Notification

- Enter the values you'd like to see in the notification

#### Step 3
Interact with the Notification

- Fill the text box in the toast notification with a message
- Click yes or know
- Check out the values packed back to the site
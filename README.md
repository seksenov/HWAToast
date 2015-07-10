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
- Click Notify!

#### Step 3
Interact with the Notification

- Fill the text box in the toast notification with a message
- Click yes or know
- Check out the values packed back to the site

#### More Info
- To start your own hosted web app project from scratch check out the appx yeoman generator [here](https://github.com/MicrosoftEdge/generator-appx)
- If you have an existing web app with a JSON manifest that you'd like to publish on WIndows 10 and other platforms check out [ManifoldJS](http://www.manifoldjs.com/)
- For more info on Hosted Web Apps for Windows 10 check out [Project Wesminster in a nutshell](http://blogs.windows.com/buildingapps/2015/07/06/project-westminster-in-a-nutshell/)
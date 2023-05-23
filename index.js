/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import notifee, {EventType} from '@notifee/react-native';
const getnoti = () => {
  axios
    .get('http://15.164.7.163:8080/fallen') // 여기에 아마 서버 주소??
    .then(json => {
      const infoData = json.data;
      console.log(infoData);
    });
};

notifee.onBackgroundEvent(
  async ({title = '알림', body = '이게되네'}) => {
    const channelId = await notifee.createChannel({
      id: 'channelId',
      name: 'channelName',
    });

    await notifee.displayNotification({
      title,
      body,
      android: {
        channelId,
      },
    });
  },

  //     async ({ type, detail }) => {
  //   const { notification, pressAction } = detail;

  //   // Check if the user pressed the "Mark as read" action
  //   if (type === EventType.ACTION_PRESS && pressAction.id === 'mark-as-read') {
  //     // Update external API
  //     await fetch(`https://my-api.com/chat/${notification.data.chatId}/read`, {
  //       method: 'POST',
  //     });

  //     // Remove the notification
  //     await notifee.cancelNotification(notification.id);
  //   }
  // }
);

// Register main application
AppRegistry.registerComponent(appName, () => App);
console.disableYellowBox = true; // warnig 안보이게

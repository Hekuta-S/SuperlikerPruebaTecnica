import { Injectable } from '@angular/core';
import { PushNotifications, PermissionStatus } from '@capacitor/push-notifications';

@Injectable({ providedIn: 'root' })
export class PushService {
  async requestPushPermission(): Promise<PermissionStatus> {
    try {
      const status = await PushNotifications.requestPermissions();
      return status;
    } catch (e) {
      return { receive: 'denied' } as PermissionStatus;
    }
  }
}
